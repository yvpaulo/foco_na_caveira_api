'use strict'

class Session {
  //faz com que todas as validações ejam aplicadas de uma vez só
  get validatorALL (){
    return true
  }
  get rules () {
    return {
      email:'required|email',
      password: 'required'
    }
  }
}

module.exports = Session
