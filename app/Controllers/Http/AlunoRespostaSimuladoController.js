'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with alunorespostasimulados
 */
const Resposta = use('App/Models/AlunoRespostaSimulado')
const Gabarito = use('App/Models/Gabarito')
const Turma = use('App/Models/Turma')
class AlunoRespostaSimuladoController {
  /**
   * Show a list of all alunorespostasimulados.
   * GET alunorespostasimulados
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async index({ request, response, view }) {

  }

  /**
   * Render a form to be used for creating a new alunorespostasimulado.
   * GET alunorespostasimulados/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new alunorespostasimulado.
   * POST alunorespostasimulados
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  //armazena as respostas do aluno já com a verificação de acerto ou erro
  async store({ auth, request, response }) {
    const respostas = request.input('respostas')

    try {
      const resultado = await Gabarito
        .corrigeRespostas(
          respostas,
          request.input('simulado_id'),
          auth.user.id
        )
      return resultado
    }
    catch (error) {
      return response
        .status(401)
        .send({ message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!' })
    }
  }

  /**
   * Display a single alunorespostasimulado.
   * GET alunorespostasimulados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing alunorespostasimulado.
   * GET alunorespostasimulados/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update alunorespostasimulado details.
   * PUT or PATCH alunorespostasimulados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a alunorespostasimulado with id.
   * DELETE alunorespostasimulados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }

  //calcula a nota e o rendimento do aluno no simulado
  async calculaNota({ params, auth, request, response }) {
    //const data = params.turma_id
    const turma = await Turma.query()
                        .where('id', params.turma_id)
                        .with('simulados')
                        .first()


    const id_user = auth.user.id

    const simulados = await turma.simulados().ids()

    // const simulados_id = simulados.toJSON()//.map(s => s.id)
    //return simulados_id
    // const data  = request.only(['id_user', 'id_simulado'])

    const resultado = await Gabarito.retornaNotas(
      id_user,
      simulados
    )
    return resultado

    /*try {
      const data = request.only(['id_user', 'id_simulado'])
      const resultado = await Gabarito.calculaNota(
        data.id_user,
        data.id_simulado
      )
      return resultado
    } catch (error) {
      return response
        .status(401)
        .send({ message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!' })
    }*/
  }
  //retorna a lista das repostas do aluno corrigida por simulado
  async corrigeRespostas({ request, response }) {
    try {
      const data = request.only(['id_user', 'id_simulado'])
      const resultado = await Gabarito
        .corrigeGabarito(
          data.id_user,
          data.id_simulado
        )

      return resultado
    } catch (error) {
      return response
        .status(401)
        .send({ message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!' })
    }
  }

}



module.exports = AlunoRespostaSimuladoController
