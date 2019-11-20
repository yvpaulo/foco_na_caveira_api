'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class QuestaoSimulado extends Model {

 //para aceitar o nome da tabela que modifiquei
 static get table () {
  return 'questao_simulados'
}
  simulados () {
    return this.belongsTo('App/Models/Simulado')

  }

  questoes () {
    return this.belongsTo('App/Models/Questao')

  }

  //relacionamento com as respostas que o aluno dá
  respostasDosAlunos () {
    return this.hasMany('App/Models/AlunoRespostaSimulado')
  }

}

module.exports = QuestaoSimulado
