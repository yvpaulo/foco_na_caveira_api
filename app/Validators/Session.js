'use strict'

class Session {
  //faz com que todas as validações sejam aplicadas de uma vez só
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
