'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
  //relacionamento de tags com as questões, uma tag pode estar em varias
// questões e a questão pode ter varias tags
questao (){
  return this.belongsToMany('App/Models/Questao').pivotModel(
    'App/Models/TagQuestao'
        )
}
}

module.exports = Tag
