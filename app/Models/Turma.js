'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Turma extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/Slugify', {
      fields: {
        slug: 'titulo'
      },
      strategy: 'dbIncrement',
      disableUpdates: false
    })
  }

  user (){
    return this.belongsToMany('App/Models/User').pivotModel(
      'App/Models/UserTurma'
          )
  }

  simulados () {
    return this.hasMany('App/Models/Simulado')
  }
}

module.exports = Turma
