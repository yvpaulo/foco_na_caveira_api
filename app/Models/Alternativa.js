'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Alternativa extends Model {
  //qual questao vai ter essa alternativa
 questao (){
  return this.belongsTo('App/Models/Questao')
}
}

module.exports = Alternativa
