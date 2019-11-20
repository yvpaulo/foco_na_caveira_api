'use strict'
const Env = use('Env')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Simulado extends Model {
 //campo virtual para mostrar url dos pdfs e gabaritos
  static get computed () {
    return ['url', 'urlGagarito']
  }
 /* static get computed () {
    return ['urlGagarito']
  }*/

  getUrl ({ pdf }) {
    return `${Env.get('APP_URL')}/simulados/${pdf}`
  }
  getUrlGagarito ({ gabarito }) {
    return `${Env.get('APP_URL')}/simulados/${gabarito}`
  }

  //quais questoes o simulado tem do banco de questões
  questoes () {
    return this.belongsToMany('App/Models/Questao').pivotModel(
      'App/Models/QuestaoSimulado'
    )
  }

  questoesDoSimulado(){
    return this.hasMany('App/Models/QuestaoSimulado')
  }


}

module.exports = Simulado
