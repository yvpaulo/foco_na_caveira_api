'use strict'

const User = use('App/Models/User')
const Convite = use('App/Models/Convite')
const Role = use('Adonis/Acl/Role')
const Database = use('Database')

class UserController {

  async index ({request}) {

    //retorna usuarios com as respequitivas roles, permission e turmas
    const users = await User.query()
    .with('turmas')
    .with('roles')
    .with('permission')
    .fetch()

    return {
      users
      //permissions:   await users.first().getPermissions()

    }
  }
  //atualiza por enquanto só as roles do usuario
  async updateRole ({request, params}) {
    const roles = request.input('roles')

    const user = await User.find(params.id)

    await user.roles().sync(roles)


  }

  async store ({request, response, auth}){
    const data = request.only(['name', 'userName', 'email', 'password', 'cpf', 'nascimento' ])

  //veirifca se já tem algum username, ou cpf, ou email igual cadastrado
      const userQuery =  await User.query().where('userName', data.userName).orWhere('email', data.email).orWhere('cpf', data.cpf).first()

      if (userQuery === null){

      try {
        const user = await User.create(data)
        const token = await auth.attempt(data.email, data.password)
        //todo usuario quando se cadastra é visitante
        const visitanteRole = await Role.findBy('slug','visitante')
        await user.roles().attach([visitanteRole.id])
      //return token
      //ver como encaminha o usario para o daschborde dele ou para o cadastro de turmas
      return response.status(200).send({message: 'Cadastrado com sucesso!!',token})
      } catch (error) {
        return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
      }

      }else {
        return response.status(401).send({message: 'Este email ou UserName ou CPF já esta cadastrado!!'})
      }

    }




  }

  //este store tem que ser trabalhado para se o cara aceitou o convite de alguem
  /*
  async store ({request, response, auth}){
  const data = request.only(['name', 'userName', 'email', 'password', 'cpf', 'nascimento' ])
    //aqui verifica se tem algum convite para este email
  const turmasQuery = Convite.query().where('email', data.email)
  //faz um array de ids de turmas que o email foi convidado
  const turmas = await turmasQuery.pluck('turma_id')

  //se ele não foi convidado por ninguem
  if (turmas.length === 0){

    //const userQueryEmail = await User.findOne({ where: { email: data.email }});
    //const userQueryUserName = await User.findOne({ where: { userName: data.userName }});


    const userQuery =  await User.query().where('userName', data.userName).orWhere('email', data.email).orWhere('cpf', data.cpf).first()
     // return [response.status(200).send({message: 'Cadastrado com sucesso!!', userQuery})]
    if (userQuery === null){
      const user = await User.create(data)
      const token = await auth.attempt(data.email, data.password)
    //return token
    return response.status(200).send({message: 'Cadastrado com sucesso!!',token})
    }else {
      return response.status(401).send({message: 'Este email ou UserName ou CPF já esta cadastrado!!'})
    }
    //return response.status(401).send({message: 'Você não foi convidado por ninguem'})
  }

  /*
  essa parte tem que melhorar
  const user = await User.create(data)
  await turmasQuery.delete()
  const token = await auth.attempt(data.email, data.password)
  //tenho que ver uma maneira de encaminhar o cara para a parte de cadastro da turma que ele foi convidado
  return token


}

}*/

module.exports = UserController
