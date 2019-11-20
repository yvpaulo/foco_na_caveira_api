'use strict'

class Convite {
  //faz com que todas as validações sejam aplicadas de uma vez só
  get validatorALL (){
    return true
  }
  get rules () {
    return {
      convites:'required|array',
      'convites.*': 'required|email'
    }
  }
}

module.exports = Convite
