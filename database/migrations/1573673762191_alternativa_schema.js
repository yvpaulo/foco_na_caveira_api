'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlternativaSchema extends Schema {
  up () {
    this.create('alternativas', (table) => {
      table.increments()
      table.text('texto').notNullable()
      table.string('letra', 10).notNullable()
      table.boolean('resposta').defaultTo(false)
      table.integer('questao_id').unsigned().references('id').inTable('questoes').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('alternativas')
  }
}

module.exports = AlternativaSchema
