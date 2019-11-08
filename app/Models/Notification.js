'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Notification extends Model {
  //qual usuário vai receber a notificação
 user (){
  return this.belongsTo('App/Models/User')
}
}



module.exports = Notification
