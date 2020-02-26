'use strict'

class Simulado {
  //faz com que todas as validações sejam aplicadas de uma vez só
  get validatorALL (){
    return true
  }
  get rules () {
    return {
      titulo:'required',
      pdf:'required'
    }
  }



}

module.exports = Simulado
