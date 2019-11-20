'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TagQuestao extends Model {
//para aceitar o nome da tabela que modifiquei
static get table () {
  return 'tag_questoes'
}

  tags () {
    return this.belongsTo('App/Models/Tag')

  }

  questoes () {
    return this.belongsTo('App/Models/Questao')

  }
}

module.exports = TagQuestao
