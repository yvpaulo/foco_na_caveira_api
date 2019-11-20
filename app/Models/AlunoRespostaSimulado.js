'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AlunoRespostaSimulado extends Model {
//qual usuário está respondendo a questão do simulado
user (){
  return this.belongsTo('App/Models/User')
}
//para qual questão do simulado está sendo respondida
questaSimulado (){
  return this.belongsTo('App/Models/QuestaoSimulado')
}

}

module.exports = AlunoRespostaSimulado
