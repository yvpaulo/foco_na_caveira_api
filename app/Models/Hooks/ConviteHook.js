'use strict'

const User = use('App/Models/User')

const Kue = use('Kue')
const Job = use('App/Jobs/ConviteEmail')

const ConviteHook = exports = module.exports = {}

ConviteHook.sendIvitationEmail = async (convite) => {
  const {email} = convite

  const convidado = await User.findBy('email', email)//verifica se o convidado já tem conta
  //o bom é verificar se já tem conta e se já e já esta na turma, para não enxer o saco do aluno
  if (convidado){
      const estaNaTurma = await convidado.turmas().where('turma_id',convite.turma_id).first()

      if (estaNaTurma){
          return console.log('esta na turma')
       }
    //isso automaticamente criaria a conta para o convidado
    //await convidado.turmas().attach(convite.turma_id)
  } else {
    //enviar e-mail
      const user = await convite.user().fetch()
      const turma = await convite.turma().fetch()

      Kue.dispatch(Job.key, {user, turma, email}, {attempts:3})

  }

  //
}
