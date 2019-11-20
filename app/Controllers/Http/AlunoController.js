'use strict'

const UserTurma = use('App/Models/UserTurma')
const Database = use('Database')

class AlunoController {
  async alunosMatriculados ({request}){
    const data = request.only(['turma_id'])
    //retorna os alunos de todas as turma especifica
    const alunos = await UserTurma.query()
    .where('turma_id', data.turma_id)
    .with('user')
    .fetch()

    return alunos

  }
  //retornar todas as turmas com seus respectivos alunos matriculados
  async index({request}){
    const alunosMatriculados = await UserTurma.query()
    .orderBy('turma_id')
    .with('turmas')
    .with('user')
    .fetch()

     return alunosMatriculados
  }

  //metodo para matricular alunos em uma turma
async store ({request, response, auth}){
  const data = request.only(['turma_id', 'user_id'])

//verifca se já esta cadastrado na turma
    //const userQuery =  await UserTurma.query().where(['turma_id', data.turma_id],['user_id', data.user_id]).first()

  // if (userQuery === null){
      //tenho que ver essa parte de role por turma ou outra maneira de garantir que só
      //o aluno matriculado na turma acesse a mesma
    try {
      const matricula = await UserTurma.create(data)

      //quando o usuario se matricula passa a ter a role de aluno da turma
    //  const alunoRole = await Role.findBy('slug','aluno')
      //await user.roles().attach([alunoRole.id])


    return response.status(200).send({message: 'Matriculado com sucesso!!'})
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
    }

   /* }else {
      return response.status(401).send({message: 'Este email ou UserName ou CPF já esta cadastrado!!'})
    }*/

  }


/*
  async update ({request, params}){
    const roles = request.input('roles')

    const turmaJoin = await UserTurma.find(params.id)

    await turmaJoin.roles().sync(roles)
  }*/
}

module.exports = AlunoController
