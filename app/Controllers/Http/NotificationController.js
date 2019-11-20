'use strict'
const User = use('App/Models/User')
const Notification = use('App/Models/Notification')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with notifications
 */
class NotificationController {
  /**
   * Show a list of all notifications.
   * GET notifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth, response, params }) {

    try {
      //retorna todos as notificações do usuario logado
      const notifications = await auth.user.notifications().orderBy('created_at', 'desc').fetch()
      /*const  user = await User.query().where('email', auth.user.email).first()
    const notifications = await user.notifications().orderBy('created_at', 'desc').fetch()*/
    //
   //const notifications   = await Notification.query().where('user_id', auth.user.id).fetch()
 //const notifications = await Notification.query().where('user_id', params.id).fetch()
   // const notifications = await Notification.all()
   //const notifications = await auth.user.id
    return notifications
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, tente novamente mais tarde!', error})
    }

  }

  /**
   * Render a form to be used for creating a new notification.
   * GET notifications/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new notification.
   * POST notifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['content', 'user_id'])

    try {
      const notification = await Notification.create(data)

      return notification
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, verifique se digitou as informações corretamente, ou tente novamente mais tarde!'})
    }

  }

  /**
   * Display a single notification.
   * GET notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing notification.
   * GET notifications/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update notification details.
   * PUT or PATCH notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    try {
      const notification = await Notification.findBy('id', params.id)
      notification.read = true
      await notification.save()


      return notification
    } catch (error) {
      return response.status(401).send({message: 'Ocorreram alguns problemas, por favor tente novamente mais tarde!'})
    }


  }

  /**
   * Delete a notification with id.
   * DELETE notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = NotificationController
