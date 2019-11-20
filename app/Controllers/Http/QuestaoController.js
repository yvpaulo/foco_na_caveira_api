'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with questaos
  Controller para Questão - as questões que compõem um banco de questão para os simulados
 */

const Questao = use('App/Models/Questao')
class QuestaoController {
  /**
   * Show a list of all questaos.
   * GET questaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const questoes = await Questao.query().with('alternativas').with('tags').orderBy('created_at', 'desc').fetch()

    return questoes
  }

  /**
   * Render a form to be used for creating a new questao.
   * GET questaos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new questao.
   * POST questaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['texto', 'grau_de_dificuldade', 'comentario','observacao'])

    try {

      const questao = await Questao.create(data)
      return questao
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
    }
  }

  /**
   * Display a single questao.
   * GET questaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const questao = await Questao.findOrFail(params.id);
    return questao
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
    }
  }

  /**
   * Render a form to update an existing questao.
   * GET questaos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update questao details.
   * PUT or PATCH questaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const questao = await Questao.findOrFail(params.id);
    const data = request.only(['texto', 'grau_de_dificuldade', 'comentario','observacao']);

    try {
    questao.merge(data);
    await questao.save();

    return questao
    }catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
    }
  }

  /**
   * Delete a questao with id.
   * DELETE questaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const questao = await Questao.findOrFail(params.id);
    await questao.delete();
    return response.status(200).send({message: 'Deletado com sucesso!'})
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
    }
  }
}

module.exports = QuestaoController
