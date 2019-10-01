'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConviteSchema extends Schema {
  up () {
    this.create('convites', (table) => {
      table.increments()
      table //qual usuario esta realizando  o convite
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table //para qual turma o convite esta sendo feito
        .integer('turma_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('turmas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('email').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('convites')
  }
}

module.exports = ConviteSchema
