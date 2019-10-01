'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTurmaSchema extends Schema {
  up () {
    this.create('user_turmas', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('turma_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('turmas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_turmas')
  }
}

module.exports = UserTurmaSchema
