'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with alternativas
 */
const Alternativa = use('App/Models/Alternativa')
class AlternativaController {
  /**
   * Show a list of all alternativas.
   * GET alternativas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const data = request.only('questao_id')
    const alternativas = await Alternativa.query()
                                           .where('questao_id', data.questao_id)
                                           .orderBy('letra')
                                           .fetch()
    return  alternativas
  }

  /**
   * Render a form to be used for creating a new alternativa.
   * GET alternativas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new alternativa.
   * POST alternativas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['texto', 'letra','resposta','questao_id'])
    data.letra = data.letra.toUpperCase()


    try {


      const query = await Alternativa.query()
                                     .where('questao_id', data.questao_id)
                                        .where(function() {
                                           this.where('texto', data.texto)
                                          .orWhere('letra', data.letra)
                                         }).first()


      if (query !== null){
        if (data.resposta && query.resposta){
          return response.status(401).send({message: 'Já existe alternativa marcada como a resposta da questão!'})
        }
        return response.status(401).send({message: 'Já existe alternativa com essa letra ou texto!'})
      }else
      {

        if (data.resposta){
          const queryResposta = await Alternativa.query()
                        .where('questao_id', data.questao_id)
                        .andWhere('resposta', true)
                        .select('resposta').first()
        if(queryResposta){
          return response.status(401).send({message: 'Já existe outra alternativa marcada como a resposta da questão!'})}
        }


        const alternativa = await Alternativa.create(data)

      return alternativa
    }
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
    }
  }

  /**
   * Display a single alternativa.
   * GET alternativas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing alternativa.
   * GET alternativas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {

  }

  /**
   * Update alternativa details.
   * PUT or PATCH alternativas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only(['texto', 'letra','resposta','questao_id'])
    data.letra = data.letra.toUpperCase()


    try {
      const alternativa = await Alternativa.findOrFail(params.id);
      if (!alternativa){
        return response.status(401).send({message: 'Essa alternativa não foi encontrada!'})
      }
      const query = await Alternativa.query()
                        .whereNot('id', params.id)
                        .where('questao_id', data.questao_id)
                        .where(function() {
                        this.where('texto', data.texto)
                        .orWhere('letra', data.letra)
                        }).first()

      if (query !== null){

        return response.status(401)
        .send({message: 'Já existe alternativa com essa letra ou texto!'})
      }else
      {
        if (data.resposta){
          const queryResposta = await Alternativa.query()
                        .whereNot('id', params.id)
                        .where(function() {
                        this.where('questao_id', data.questao_id)
                        .andWhere('resposta', true)

                        }).select('resposta').first()
        if(queryResposta){
          return response.status(401)
          .send({message: 'Já existe alternativa marcada como a resposta da questão!'})}
        }
        alternativa.merge(data)
        await alternativa.save()
      return alternativa
    }
    } catch (error) {
      return response.status(401)
      .send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
    }
  }

  /**
   * Delete a alternativa with id.
   * DELETE alternativas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const alternativa = await Alternativa.findOrFail(params.id);
    await alternativa.delete();
    return response.status(200).send({message: 'Deletado com sucesso!'})
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
    }

  }

}

module.exports = AlternativaController
