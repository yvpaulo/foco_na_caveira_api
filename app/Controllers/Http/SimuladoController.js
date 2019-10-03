'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with simulados
 */
class SimuladoController {
  /**
   * Show a list of all simulados.
   * GET simulados
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    //estou usando dessa forma porque criei um midleware de turma e
    //no com a informação da turma verifico quais simulados ela tem
    const simulados = request.turma.simulados().fetch()

    return simulados
  }

  /**
   * Render a form to be used for creating a new simulado.
   * GET simulados/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new simulado.
   * POST simulados
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['titulo', 'gabarito', 'pdf'])

    try {
      const simulado = request.turma.simulados().create(data)

    return simulado
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
    }

  }

  /**
   * Display a single simulado.
   * GET simulados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const simulado = await request.turma.simulados().where('id', params.id).first()

    return simulado
  }

  /**
   * Render a form to update an existing simulado.
   * GET simulados/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update simulado details.
   * PUT or PATCH simulados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only(['titulo', 'gabarito', 'pdf'])
    const simulado = await request.turma.simulados().where('id', params.id).first()

    simulado.merge(data)

    await simulado.save()

    return simulado
  }

  /**
   * Delete a simulado with id.
   * DELETE simulados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

    const simulado = await request.turma.simulados().where('id', params.id).first()

    await simulado.delete()
  }
}

module.exports = SimuladoController
