import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugins'

interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlbody: string
  attachements?: Attachement[]
}
interface Attachement {
  filename: string
  path: string
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAIL_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlbody, attachements = [] } = options
    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlbody,
        attachments: attachements
      })

      console.log(sentInformation)

      return true
    } catch (error) {
      console.log(error)

      return false
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs del sistema'
    const htmlbody = `
        <h3>Logs de sistema NOC</h3>
        <p>Ver logs Adjuntos!</p>
      `

    const attachements: Attachement[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-high.log', path: './logs/logs-high.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
    ]

    return this.sendEmail({
      to,
      subject,
      htmlbody,
      attachements
    })
  }
}
