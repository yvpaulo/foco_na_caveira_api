'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TurmaSchema extends Schema {
  up () {
    this.create('turmas', (table) => {
      table.increments()
      table.string('titulo', 80).notNullable().unique()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .string('slug')
        .notNullable()
        .unique()
      table
        .text('descricao')
      table.timestamps()
    })
  }

  down () {
    this.drop('turmas')
  }
}

module.exports = TurmaSchema
