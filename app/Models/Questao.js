'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Questao extends Model {
  //para aceitar o nome da tabela que modifiquei
  static get table () {
    return 'questoes'
  }

//relacionamento de simulado com questões, uma questão pode estar em varios
// simulados e o simulado pode ter varias questões
simulado (){
  return this.belongsToMany('App/Models/Simulado').pivotModel(
    'App/Models/QuestaoSimulado'
        )
}

//relacionamento de questões com tag, uma questão pode ter várias tags
// e a tag pode estar em varias questões <<<ver isso
tags (){
  return this.belongsToMany('App/Models/Tag').pivotModel(
    'App/Models/TagQuestao'
        )
}
//relacionamento com alternativas
alternativas () {
  return this.hasMany('App/Models/Alternativa')
}

}

module.exports = Questao
