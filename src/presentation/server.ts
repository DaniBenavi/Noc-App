import { LogRepositoryImpl } from '../infrastructure/repositories/los-repository.impl'
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource'
import { EmailService } from './email/email-service'
import { SendEmailLogs } from '../domain/uses-cases/email/send-email-logs'

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource())
const emailService = new EmailService()
export class Server {
  public static start() {
    console.log('Server started')

    // para que pueda funcionar dentro del execute debes hacer lo siguiente: poner los correos que necesites inviarles informacion
    //     new SendEmailLogs(emailService, fileSystemLogRepository).execute(['correo1@gmail.com','correo2@gmail.com'])

    new SendEmailLogs(emailService, fileSystemLogRepository).execute([''])
  }
}
