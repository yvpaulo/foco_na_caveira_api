'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  //para tratar as permissões de usuário
  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }

 static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
  //retorna todos relacionamentos de usuario UserTurma
  //retorna todos os models UserTurma associados com este User
  turmaJoins () {
    return this.hasMany('app/Models/UserTurma')
  }

  roles () {
    return this.belongsToMany('Adonis/Acl/Role')
  }

  permission () {
    return this.belongsToMany('Adonis/Acl/Permission')
  }

  profile () {
    return this.hasOne('App/Models/Profile')
  }
  //quais turmas o usuario esta matriculado
  turmas () {
    return this.belongsToMany('App/Models/Turma').pivotModel(
      'App/Models/UserTurma'
    )
  }
  //relacionamento com notificações
  notifications () {
    return this.hasMany('App/Models/Notification')
  }

}

module.exports = User
