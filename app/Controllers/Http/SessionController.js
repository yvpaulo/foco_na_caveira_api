'use strict'
const User = use('App/Models/User')
//const authConfig = use('../../config/auth')
class SessionController {
  async store ({request, auth, response}) {
    const { email, password} = request.all()

    const token = await auth.attempt(email, password)
    //token.refreshToken = true;
    const user =  await User.query().where('email', email).first()
    const {id, name} = user;
    //return token
    return response.json({
      user:{
        id,
        name,
        email,

      },
      token: token.token
    })
  }
}

module.exports = SessionController
