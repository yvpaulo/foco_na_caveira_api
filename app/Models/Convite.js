'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Convite extends Model {
  static boot () {
    super.boot()
    this.addHook( 'afterCreate', 'ConviteHook.sendIvitationEmail')
  }

  //qual usuário está fazendo o convite
  user (){
    return this.belongsTo('App/Models/User')
  }
  //para qual turma o convite esta sendo feito
  turma (){
    return this.belongsTo('App/Models/Turma')
  }
}

module.exports = Convite
