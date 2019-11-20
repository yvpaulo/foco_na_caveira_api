'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestaoSimuladoSchema extends Schema {
  up () {
    this.create('questao_simulados', (table) => {
      table.increments()
      table.integer('numero')
      table.decimal('valor_se_certo').notNullable();
      table.decimal('valor_se_errado').defaultTo(0);
      table
        .integer('simulado_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('simulados')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('questao_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('questoes')
        .onUpdate('CASCADE')
        .onDelete('NO ACTION')
      table.timestamps()
    })
  }

  down () {
    this.drop('questao_simulados')
  }
}

module.exports = QuestaoSimuladoSchema
