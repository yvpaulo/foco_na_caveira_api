'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AtualizaLiberaSimuladoSchema extends Schema {
  up () {
    this.table('simulados', (table) => {
      table.boolean('libera_simulado').defaultTo(false).after('pdf')
    })
  }

  down () {
    this.table('simulados', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AtualizaLiberaSimuladoSchema
