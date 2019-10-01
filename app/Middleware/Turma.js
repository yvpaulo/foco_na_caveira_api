'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Turma {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {

      const slug = request.header('TURMA')

      let turma = null

      if (slug){

          turma = await auth.user.turmas().where('slug', slug).first()
      }

      if (!turma){
          return response.status(401).send()
      }

      auth.user.currentTurma = turma.id
      request.turma = turma
    await next()
  }
}

module.exports = Turma
