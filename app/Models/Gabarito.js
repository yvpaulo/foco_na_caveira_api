'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Model = use('Model')

const Alternativa = use('App/Models/Alternativa')
const Simulado = use('App/Models/Simulado')
const RespostaDoAluno = use('App/Models/AlunoRespostaSimulado')
const QuestaoSimulado = use('App/Models/QuestaoSimulado')
const User = use('App/Models/User')

class Gabarito extends Model {

  static async retorna_gabarito(simulado_id) {

    try {
      const simulado = await Simulado.query()
        .where('id', simulado_id)
        .with('questoesDoSimulado')
        .first()

      let resposta = {
        'numero_questao': '',
        'letra_resposta': '',
        'valor_se_certo': '',
        'valor_se_errado': '',
        'questao_id': '' //id da questaoDoSimulado
      }

      const { questoesDoSimulado } = simulado.toJSON()
      const questoes_id = (questoesDoSimulado.map(questoes =>
        questoes.questao_id))

      const alternativasCorretas = await Alternativa.query().where((builder) =>
        builder.whereIn('questao_id', questoes_id).where('resposta', true)
      ).fetch();

      const gabarito = {
        'simulado_id': simulado.id,
        'respostas': await (questoesDoSimulado.map(questoes =>

          resposta = {
            numero_questao: questoes.numero,
            letra_resposta: alternativasCorretas.toJSON().find(element => element.questao_id == questoes.questao_id).letra,
            valor_se_certo: questoes.valor_se_certo,
            valor_se_errado: questoes.valor_se_errado,
            questao_id: questoes.id, //id da questaoDoSimulado

          }
        )
        )
      }
      //ordena as respostas pelo numero da questao
      gabarito.respostas.sort(function (a, b) {
        return a.numero_questao < b.numero_questao ? -1 : a.numero_questao > b.numero_questao ? 1 : 0;
      })

      return gabarito
    } catch (error) {

    }

  }

  static async corrigeGabarito(id_user, id_simulado) {


    try {
      const gabarito = await this.retorna_gabarito(id_simulado)

      const respostaAluno = await RespostaDoAluno
        .query()
        .where('user_id', id_user)
        .fetch()

      let correcao = {
        'numero_questao': '',
        'acertou': '',//certa ou errada
        'pontos': ''//se errou o ponto é negativo
      }

      const correcoes = (gabarito.respostas.map(resposta =>


        correcao = {
          'numero_questao': resposta.numero_questao,
          'acertou': respostaAluno
            .toJSON()
            .find(element =>
              element.questao_simulado_id === resposta.questao_id)
            .resposta === resposta.letra_resposta ? true : false,
          'pontos': respostaAluno
            .toJSON()
            .find(element =>
              element.questao_simulado_id === resposta.questao_id)
            .resposta === resposta.letra_resposta ?
            resposta.valor_se_certo
            : resposta.valor_se_errado > 0 ? resposta.valor_se_errado * -1
              : 0
        }

      ))

      const nota = correcoes.reduce((a, b) => a.pontos + b.pontos)

      const totalPontos = gabarito.respostas
        .reduce((a, b) => a.valor_se_certo + b.valor_se_certo)
      const resultado = {
        'Correcoes': correcoes,
        'Nota': nota,
        'Aprovetamento': nota / totalPontos * 100 + '%'
      }
      return resultado

    } catch (error) {
      const message = "Ocorreram alguns problemas, por favor tente novamente mais tarde!"
      return message
    }

  }


  static async corrigeRespostas(respostaAluno, id_simulado, user_id) {

    try {
      const gabarito = await this.retorna_gabarito(id_simulado)
      const data = respostaAluno.map(resposta => ({
        user_id: user_id,
        questao_simulado_id: resposta.questao_simulado_id,
        resposta: resposta.resposta.toUpperCase(),
        //verifica se  o  aluno acertou comparando a reposta com o gabarito
        //e retorna true ou false
        acertou: gabarito.respostas
          .find(element =>
            element.questao_id === resposta.questao_simulado_id)
          .letra_resposta.toUpperCase() === resposta.resposta.toUpperCase() ?
          true : false,
        //verifica se  o  aluno acertou comparando a reposta com o gabarito
        //e retorna os pontos se certou ou se errado
        pontos: gabarito.respostas
          .find(element =>
            element.questao_id === resposta.questao_simulado_id)
          .letra_resposta.toUpperCase() === resposta.resposta.toUpperCase() ?
          //aqui retorna o valor se certo
          gabarito.respostas.find(element =>
            element.questao_id === resposta.questao_simulado_id)
            .valor_se_certo :
          //aqui retorna o valor se errado
          gabarito.respostas.find(element =>
            element.questao_id === resposta.questao_simulado_id)
            .valor_se_errado * -1
      }))

      const resultado = await RespostaDoAluno.createMany(data)
      return resultado


    } catch (error) {
      const message = "Ocorreram alguns problemas, por favor tente novamente mais tarde!"
      return message
    }

  }
  //retorna a nota de um usuario em varios simulados
  //e usar o calculaNota para dar o retorno
  static async retornaNotas(user_id, simulados) {
    try {

      //pego as questões que o aluno respondeu para resgatar o id dos simulados
      const respostas = await RespostaDoAluno.query()
        .where('user_id', user_id)
        .with('questaSimulado')
        .fetch()
      // retorna os simulados e filtra para não repetir simulados
      const simuladosRespondidos = respostas.toJSON()
        .map(resposta =>
          resposta.questaSimulado
            .simulado_id)
        .filter((el, i, arr) =>
          arr.indexOf(el) == i)
        //com os simulados do usuario verifico quis simulados dessa turma ele respondeu
      const simuladosParaBusca = simulados.map(simulado =>
        simuladosRespondidos
          .find(element => element === simulado)? simulado : 0)
          .filter((el, i, arr) =>
          arr.indexOf(el) === i )//filtro para tirar repetição
          .filter((el, i, arr) =>
          arr.indexOf(el) !== 0 )//filtro para só mandar simulados reais
      //return [simuladosParaBusca, simulados,simuladosRespondidos]
      // let simuladoId= {'id':''}
      //const ids = simulados.map(i => simuladoId={'id':i});
      //return ids
      const notas = await Promise
        .all(simuladosParaBusca
          .map(async (i) => await this.calculaNota(user_id, i)));

      return notas
    } catch (error) {

    }

  }
  //retorna a nota de um usuario em um determinado simulado
  static async calculaNota(id_user, id_simulado) {
    //return [id_user, id_simulado]
    try {
      const questoesSimuladoId = await QuestaoSimulado.query()
        .where('simulado_id', id_simulado)
        .select('id').fetch()

      const ids = questoesSimuladoId.toJSON().map(q => q.id)

      const pontosRepostasAluno = await RespostaDoAluno.query()
        .where('user_id', id_user)
        .whereIn('questao_simulado_id', ids)
        .select('pontos').fetch()
      const nota = pontosRepostasAluno.toJSON()
        .reduce((a, b) => a.pontos + b.pontos)

      const resultado = {
        'Simulado': id_simulado,
        'Nota': nota,
        'Aproveitamento': (nota > 0 ? (nota / ids.length * 100 + '%') : ('0%'))
      }
      return resultado
    } catch (error) {
      const message = "Ocorreram alguns problemas, por favor tente novamente mais tarde!"
      return message
    }
  }
}





module.exports = Gabarito
