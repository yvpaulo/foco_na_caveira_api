'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AtualizaQuestaoSchema extends Schema {
  up () {
    this.alter('questoes', (table) => {
       table.text('comentario').after('grau_de_dificuldade')

    })
  }

  down () {
    this.alter('questoes', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AtualizaQuestaoSchema
