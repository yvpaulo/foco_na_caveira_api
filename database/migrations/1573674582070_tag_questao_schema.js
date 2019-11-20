'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagQuestaoSchema extends Schema {
  up () {
    this.create('tag_questoes', (table) => {
      table.increments()
      table
        .integer('tag_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tags')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('questao_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('questoes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('tag_questoes')
  }
}

module.exports = TagQuestaoSchema
