'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserTurma extends Model {


  user () {
    return this.belongsTo('App/Models/User')

  }

  turmas () {
    return this.belongsTo('App/Models/Turma')

  }
}

module.exports = UserTurma
