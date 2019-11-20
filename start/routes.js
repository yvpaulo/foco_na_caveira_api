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
//para usuario se cadastrar
Route.post('users', 'UserController.store').validator('User')
//mostrar pdf dos simulados
Route.get('simulados/:pdf', 'SimuladoController.showPDF')
//mostrar pdf dos gabaritos
Route.get('simulados/:gabarito', 'SimuladoController.showGabarito')

// todas as rotas que exigem que o usuario seja administrador
Route.group(() => {

  Route.resource('tagquestoes','TagQuestaoController')
  Route.resource('questaosimulados', 'QuestaoSimuladoController')
  Route.resource('tags', 'TagController')
  Route.resource('questoes', 'QuestaoController').validator(new Map([
    [
      ['questoes.store', 'questoes.update'],
      [ 'Questao']
    ]
  ]))
  Route.resource('alternativas', 'AlternativaController').apiOnly()

}).middleware('is:administrador').middleware('auth') //usuario precisa ser administrador e estar logado

Route.group(() => {
  Route.resource('notifications', 'NotificationController').apiOnly()
 // Route.get('notifications', 'NotificationController.index')
  //retorna todos os usuarios cadastrados com suas turmas e roles somente para o admim
  Route.get('users', 'UserController.index').middleware('is:administrador')
  // atualiza as roles de um usuario
  Route.put('users/:id', 'UserController.updateRole').middleware('is:administrador')
  Route.resource('roles', 'RoleController').middleware('is:administrador')
  Route.resource('turmas', 'TurmaController')
  .apiOnly()
  .validator(new Map([
    [
      ['turmas.store', 'turmas.update'],
      [ 'Turma']
    ]
  ]))
  //retorna os alunos por turma
  Route.get('alunos', 'AlunoController.alunosMatriculados').middleware('is:administrador')
  //matricula o aluno
  Route.post('alunos', 'AlunoController.store').middleware('is:administrador')
}).middleware('auth') //usuario precisa estar logado

//grupo de rotsa para as turmas
Route.group(() => {
  //rota para ver o gabarito do simulado
  Route.get('gabaritodosimulado/:id', 'SimuladoController.gabaritoDoSimulado')
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

  Route.get('alunos', 'AlunoController.index')

}).middleware(['auth','turma']) //usuario precisa estar logado e pertencer a uma turma
