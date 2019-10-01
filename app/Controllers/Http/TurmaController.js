'use strict'

class TurmaController {
  //minhas turmas
  async index ({auth}){
    //retorna todos as turmas do usuario logado
    const turmas = await auth.user.turmas().fetch()

    return turmas
  }

  async store ({request, auth}){
    const data = request.only(['titulo'])

    const turma = await auth.user.turmas().create({
      ...data,
      user_id: auth.user.id //usuario que criou a turma
    })

    return turma
  }

  async show ({params, auth}){
    const turma = await auth.user.turmas().where('turmas.id', params.id).first()
    return turma
  }

  async update ({params, request, auth}){
    const data = request.only(['titulo'])
    const turma = await auth.user.turmas().where('turmas.id', params.id).first()

    turma.merge(data)

    await turma.save()

    return turma

  }

  async destroy ({params, auth}){

    const turma = await auth.user.turmas().where('turmas.id', params.id).first()

    await turma.delete()

    const message = 'Turma deletada com sucesso!'

    return message



  }
}

module.exports = TurmaController
