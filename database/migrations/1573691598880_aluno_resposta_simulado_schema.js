'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlunoRespostaSimuladoSchema extends Schema {
  up () {
    this.create('aluno_resposta_simulados', (table) => {
      table.increments()
      table.string('resposta', 10)
      table.integer('questao_simulado_id')
            .unsigned()
            .references('id')
            .inTable('questao_simulados')
            .onUpdate('CASCADE')
            .onDelete('NO ACTION')
      table //qual usuario esta respondendo
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('aluno_resposta_simulados')
  }
}

module.exports = AlunoRespostaSimuladoSchema
