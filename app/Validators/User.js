'use strict'

class User {
  //faz com que todas as validações ejam aplicadas de uma vez só
  get validatorALL (){
    return true
  }

  get rules () {
    return {
      name: 'required',
      userName: 'required|unique:users',
      cpf: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
      nascimento: 'required'
    }
  }
}

module.exports = User
