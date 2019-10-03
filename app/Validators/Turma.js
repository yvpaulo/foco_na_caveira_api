'use strict'

class Turma {
  //faz com que todas as validações ejam aplicadas de uma vez só
  get validatorALL (){
    return true
  }
  get rules () {
    return {
      titulo: 'required|unique:turmas',
    }
  }
}

module.exports = Turma
