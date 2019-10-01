'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('sessions','SessionController.store')

Route.group(() => {
  Route.resource('turmas', 'TurmaController').apiOnly()
}).middleware('auth') //usuario precisa estar logado

Route.group(() => {
  Route.post('convites', 'ConviteController.store')
}).middleware(['auth', 'turma']) //usuario precisa estar logado e pertencer a uma turma
