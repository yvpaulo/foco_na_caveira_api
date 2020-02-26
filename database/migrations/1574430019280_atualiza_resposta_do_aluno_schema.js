'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AtualizaRespostaDoAlunoSchema extends Schema {
  up () {
    this.alter('aluno_resposta_simulados', (table) => {
      table.boolean('acertou').defaultTo(false)
      table.decimal('pontos')
    })
  }

  down () {
    this.table('aluno_resposta_simulados', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AtualizaRespostaDoAlunoSchema
