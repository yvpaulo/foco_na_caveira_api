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


