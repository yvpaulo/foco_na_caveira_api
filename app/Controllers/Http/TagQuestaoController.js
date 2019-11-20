'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tagquestaos
 */
const Questao = use('App/Models/Questao')
const Tag = use('App/Models/Tag')
const TagQuestao = use('App/Models/TagQuestao')
class TagQuestaoController {

  /**
   * Show a list of all tagquestaos.
   * GET tagquestaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
      //const data = request.only(['questao_id'])
      //const questao = await Questao.query().where('id', data.questao_id).with('tags').fetch()
      //return questao
      const data = await TagQuestao.all()
      return data
  }

  /**
   * Render a form to be used for creating a new tagquestao.
   * GET tagquestaos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new tagquestao.
   * POST tagquestaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['questao_id', 'tag_id'])

      try {
        const query = await TagQuestao.query().where('questao_id', data.questao_id).where('tag_id', data.tag_id).first()
        if(!query)
        {await TagQuestao.create(data)
        const questao = await Questao.query().where('id', data.questao_id).with('tags').fetch()
        return questao}
        else{
          return response.status(401).send({message: 'Esta tag já existe nesta questão!'})
        }
      } catch (error) {
        return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
      }

  }

  /**
   * Display a single tagquestao.
   * GET tagquestaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
//    const data = params.id

  }

  /**
   * Render a form to update an existing tagquestao.
   * GET tagquestaos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update tagquestao details.
   * PUT or PATCH tagquestaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a tagquestao with id.
   * DELETE tagquestaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  //,elhorar isso para receber o id da tagquestão em vez do request
  async destroy ({ params, request, response }) {
    // para usar com o request
    //const data = request.only(['tag_id', 'questao_id'])

    try {
    /* para usar com request
     const tagQuestao = await TagQuestao.query()
      .where({tag_id: data.tag_id, questao_id: data.questao_id })
      .first();*/
    const tagQuestao = await TagQuestao.findOrFail(params.id)
    await tagQuestao.delete();

    return response.status(200).send({message: 'Deletado com sucesso!'})
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!', error})
    }
  }
}

module.exports = TagQuestaoController
