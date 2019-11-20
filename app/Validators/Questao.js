'use strict'

class Questao {
  //faz com que todas as validações sejam aplicadas de uma vez só
  get validatorALL (){
    return true
  }
  get rules () {
    return {
      texto: 'required'

    }
  }

}

module.exports = Questao
