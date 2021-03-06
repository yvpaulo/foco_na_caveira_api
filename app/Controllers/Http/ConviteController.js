'use strict'

const Convite = use('App/Models/Convite')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with convites
 */
class ConviteController {
  /**
   * Show a list of all convites.
   * GET convites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new convite.
   * GET convites/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {


  }

  /**
   * Create/save a new convite.
   * POST convites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    const convites = request.input('convites')
    try {
      const data = convites.map(email => ({
        email,
        user_id: auth.user.id,
        turma_id: request.turma.id
      }))
        //é bom verificar aqui se o usuario já convidou este email para esta turma e só gravar no banco o que for inédito
        //lembrando que aqui posso receber mais de um convite por vez, então teria que
        //procurar cada informação e verificar
      //const conviteExist = await Convite.where()...

      await Convite.createMany(data)
      return response.status(200).send({message: 'Convites enviados com sucesso!'})
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
    }

  }

  /**
   * Display a single convite.
   * GET convites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing convite.
   * GET convites/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update convite details.
   * PUT or PATCH convites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a convite with id.
   * DELETE convites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ConviteController
