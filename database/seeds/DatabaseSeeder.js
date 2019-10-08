'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
const Role = use('Adonis/Acl/Role')
const Permission = use('Adonis/Acl/Permission')
//const Profile = use('App/Models/profile')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name: 'admin',
      userName: 'admin',
      email: 'admin@caveira.com',
      password: '123456',
      cpf: '12345678910',
      nascimento: '1979/10/21'
    })
    //criando a permission para convite
    const createConvite = await Permission.create({
      name: 'convidar_membros',
      slug: 'invites_create',
      description: 'permitir usuarios convidar pessoas para a turma'
    })

    const createTurma_e_afins = await Permission.create({
      slug: 'turmas_create',
      name: 'criar turmas',
      description: 'permitir usuarios criar turmas e tudo associado a elas'
    })

    const createUsuario = await Permission.create({
      slug: 'usuario_create',
      name: 'Criar usuarios',
      description: 'permitir usuarios cadastrar usuários'
    })

    //criar Roles
    const admin = await Role.create({
      slug: 'administrador',
      name: 'Administrador',
      description: 'Role de administrador'
    })
    const cadastrador = await Role.create({
      slug: 'cadastrador',
      name: 'Cadastrador',
      description: 'Role para quem cadastrará turmas e afins'
    })

    const aluno = await Role.create({
      slug: 'aluno',
      name: 'Aluno',
      description: 'Role de aluno para ter acesso as turmas que esta matriculado'
    })

    const visitante = await Role.create({
      slug: 'visitante',
      name: 'Visitante',
      description: 'Role de visitante,poderá ver as turmas para matricula e receber algumas promossões'
    })
    //dando permissões as Roles criadas
    await admin.permissions().attach([createConvite.id, createTurma_e_afins.id, createUsuario.id, ])
    await cadastrador.permissions().attach([createConvite.id, createTurma_e_afins.id ])
    await aluno.permissions().attach([createConvite.id])

    await user.roles().attach([admin.id])

    //cria uma turma inicial
    await user.turmas().create({
      titulo: 'Turma Teste',
      user_id: user.id
    })

    await user.profile().create({
      profile: 'admin',
      user_id: user.id
    })
  }
}

module.exports = DatabaseSeeder


