'use strict'

const UserTurma = use('App/Models/UserTurma')

class AlunoController {
  async index ({request}){

    //retorna os alunos de uma turma especifica
    const alunos = await UserTurma.query()
    .where('turma_id', request.turma.id)
    .with('user')
    .fetch()

    return alunos

  }
/*
  async update ({request, params}){
    const roles = request.input('roles')

    const turmaJoin = await UserTurma.find(params.id)

    await turmaJoin.roles().sync(roles)
  }*/
}

module.exports = AlunoController
