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
//relacionamento de turma com usuarios, um usuario pode estar em varias turmas e a turma pode ter vairos usuarios
  user (){
    return this.belongsToMany('App/Models/User').pivotModel(
      'App/Models/UserTurma'
          )
  }
//relacionamento da turma com os simulados, pois uma turma pode ter varios simulado
  simulados () {
    return this.hasMany('App/Models/Simulado')
  }
}

module.exports = Turma
