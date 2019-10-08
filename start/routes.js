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

Route.post('sessions','SessionController.store').validator('Session')
Route.post('users', 'UserController.store').validator('User')

Route.group(() => {
  Route.get('roles', 'RoleController.index')
  Route.resource('turmas', 'TurmaController')
  .apiOnly()
  .validator(new Map([
    [
      ['turmas.store', 'turmas.update'],
      [ 'Turma']
    ]
  ]))
}).middleware('auth') //usuario precisa estar logado

Route.group(() => {
  Route.post('convites', 'ConviteController.store').validator('Convite').middleware('can:invites_create')
//tenho que ver como diferencio as informações recebidas por um admin e por um aluno
  Route.resource('simulados', 'SimuladoController')
  .apiOnly()
  .validator(new Map([
    [
      ['simulados.store', 'simulados.update'],
      [ 'Simulado']
    ]
  ])).middleware(new Map([
    [
      ['simulados.store', 'simulados.update'],
      [ 'can:turmas_create']
    ]
  ]))
}).middleware(['auth', 'turma']) //usuario precisa estar logado e pertencer a uma turma
