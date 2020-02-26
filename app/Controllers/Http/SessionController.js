'use strict'
const User = use('App/Models/User')
//const authConfig = use('../../config/auth')
class SessionController {
  async store ({request, auth, response}) {
    const { email, password} = request.all()

    const token = await auth.attempt(email, password)
    //token.refreshToken = true;
    const userQuery =  await User.query()
                        .with('roles')
                        .where('email', email)
                        .first()


    const {id, name, roles} = userQuery.toJSON()

    return response.json({
      user:{
        id,
        name,
        email,
        roles,

      },

      token: token.token,


    })
  }
}

module.exports = SessionController
