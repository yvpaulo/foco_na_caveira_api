'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with simulados
 */

const Helpers = use('Helpers')
const Simulado = use('App/Models/Simulado')
const Gabarito = use('App/Models/Gabarito')
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
    // com a informação da turma verifico quais simulados ela tem
    // e ainda trago quantas questões o simulado tem

    const simulados = request.turma
                      .simulados()
                      .withCount('questoesDoSimulado').fetch()
    //const tot = await Simulado.totalQuestoes(7)
    return simulados//, tot]
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
    const data = request.only(['titulo','libera_gabarito'])

    try {
      const pdf = request.file('pdf',
      {types: ['pdf'],
      size: '10mb'}
      )

      const gabarito = request.file('gabarito',
      {types: ['pdf'],
      size: '10mb'}
      )


    const name_pdf =data.titulo + new Date().getTime().toString() + pdf.clientName
    await pdf.move(Helpers.tmpPath('simuladosUploads'), {
      name: name_pdf/*`${Date.now()}-${file.clientName}`*/
      /*overwrite: true*/
      })
    const name_gabarito =data.titulo + new Date().getTime().toString() + gabarito.clientName
    await gabarito.move(Helpers.tmpPath('simuladosUploads'), {
        name: name_gabarito
        })

    if (!pdf.moved()) {
      return pdf.errors()
    }
    if (!gabarito.moved()) {
      return pdf.errors()
    }
    const dados = { "titulo": data.titulo, "gabarito": gabarito.fileName, "pdf": pdf.fileName}

      const simulado = request.turma.simulados().create(dados)

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
    //const simulado = await request.turma.simulados().where('id', params.id).first()
    const simulado = await Simulado.query()
                                    .where('id', params.id)
                                    .with('questoesDoSimulado', (builder) => {
                                      builder.orderBy('numero', 'asc')
                                    })
                                    .first()
     return simulado
  }
  async showPDF ({ params, request, response, view }) {

    return response.download(Helpers.tmpPath(`simuladosUploads/${params.pdf}`))

  }
//retorna o pdf do gabarito
  async showGabarito ({ params, request, response, view }) {

    return response.download(Helpers.tmpPath(`simuladosUploads/${params.gabarito}`))

  }


  //retornar o gabarito das repostas do simulado
  async gabaritoDoSimulado({ params, request, response }) {


    /*const simulado = await Simulado.query()
    .where('id',params.id)
    .with('questoesDoSimulado')
    .first()*/
    const gabarito = await Gabarito.retorna_gabarito(params.id)
    return gabarito



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
    const data = request.only(['titulo', 'gabarito', 'pdf', 'libera_gabarito'])
    const simulado = await request.turma.simulados()
                          .where('id', params.id)
                          .first()

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
