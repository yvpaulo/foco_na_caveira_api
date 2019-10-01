'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SimuladoSchema extends Schema {
  up () {
    this.create('simulados', (table) => {
      table.increments()
      table.string('titulo').notNullable()
      table.string('gabarito')
      table.string('pdf')
      table.integer('turma_id').unsigned().references('id').inTable('turmas').onUpdate('CASCADE').onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('simulados')
  }
}

module.exports = SimuladoSchema
