'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AtualizaSimuladoSchema extends Schema {
  up () {
    this.alter('simulados', (table) => {
      table.boolean('libera_gabarito').defaultTo(false).after('pdf')
    })
  }

  down () {
    this.table('simulados', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AtualizaSimuladoSchema
