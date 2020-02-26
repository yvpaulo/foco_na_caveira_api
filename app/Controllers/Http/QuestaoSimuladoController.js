'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with questaosimulados
 */

 const QuestaoSimulado = use('App/Models/QuestaoSimulado')
 const Simulado = use('App/Models/Simulado')
class QuestaoSimuladoController {
  /**
   * Show a list of all questaosimulados.
   * GET questaosimulados
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const data = request.only('simulado_id')
    const simulado = await Simulado.query()
                          .where('id', data.simulado_id)
                          .with('questoesDoSimulado')
                          .with('questoes')
                          .first()
    return simulado
   /* if(simulado.questoesDoSimulado )
    {
      return simulado
    }
    else{
      return response.status(401).send({message: 'Este simulado não possui questões!'})
    }*/
  }


  /**
   * Render a form to be used for creating a new questaosimulado.
   * GET questaosimulados/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new questaosimulado.
   * POST questaosimulados
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['numero','valor_se_certo'
                            ,'valor_se_errado','simulado_id',
                            'questao_id'])

      try {

        const query = await QuestaoSimulado.query()
        .where('simulado_id', data.simulado_id)
        .where(function() {
          this.where('numero', data.numero)
          .orWhere('questao_id', data.questao_id)})
          .first()

        if(!query)
        {
          const questaoSimulado = await QuestaoSimulado.create(data)

          return questaoSimulado
        }
        else{
          return response.status(401).send({message: 'Esta questao ou numero de questão já existe neste simulado!'})
        }
      } catch (error) {
        return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
      }
  }

  /**
   * Display a single questaosimulado.
   * GET questaosimulados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing questaosimulado.
   * GET questaosimulados/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update questaosimulado details.
   * PUT or PATCH questaosimulados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.only(['numero','valor_se_certo'
    ,'valor_se_errado','simulado_id',
    'questao_id'])

try {
  const questaoSimulado = await QuestaoSimulado.findOrFail(params.id);
  const query =  await QuestaoSimulado.query()
  .whereNot('id', params.id)
  .where(function() {
  this.where('numero', data.numero)
  .orWhere({questao_id: data.questao_id,
  simulado_id: data.simulado_id})
  }).first()

if(!query)
{
 questaoSimulado.merge(data)

 await questaoSimulado.save()

return questaoSimulado
}
else{
return response.status(401).send({message: 'Esta questao ou numero de questão já existe neste simulado!'})
}
} catch (error) {
return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
}
  }

  /**
   * Delete a questaosimulado with id.
   * DELETE questaosimulados/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const questaoSimulado = await QuestaoSimulado.findOrFail(params.id);
    await questaoSimulado.delete();
    return response.status(200).send({message: 'Deletado com sucesso!'})
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
    }


  }
}

module.exports = QuestaoSimuladoController
