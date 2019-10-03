'use strict'

class Simulado {
  //faz com que todas as validações ejam aplicadas de uma vez só
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
