'use strict'

const Mail = use('Mail')

class ConviteEmail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'ConviteEmail-job'
  }

  // This is where the work is done.
  async handle ({user, turma, email}) {

    try {
      await Mail.send(
        [
          'emails.convite'
        ],
        {turma: turma.titulo, user:user.name},
        message => {
          message
            .to(email)
            .from('foconacaveira.com.br', 'Foco na Caveira Concursos')
            .subject(`Convite para a turma ${turma.titulo}`)
        }
      )

    } catch (error) {
      console.log(error)
    }


  }
}

module.exports = ConviteEmail

