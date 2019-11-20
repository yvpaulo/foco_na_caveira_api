'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestaoSchema extends Schema {
  up () {
    this.create('questoes', (table) => {
      table.increments()
      table.text('texto').notNullable()
      table.integer('grau_de_dificuldade')
      table.string('observacao')
      table.timestamps()
    })
  }

  down () {
    this.drop('questoes')
  }
}

module.exports = QuestaoSchema
