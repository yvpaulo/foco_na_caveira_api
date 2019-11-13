'use strict'
const Env = use('Env')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Simulado extends Model {
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
}

module.exports = Simulado
