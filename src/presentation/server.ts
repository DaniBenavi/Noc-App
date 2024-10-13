import { LogRepositoryImpl } from '../infrastructure/repositories/los-repository.impl'
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource'
import { EmailService } from './email/email-service'
import { SendEmailLogs } from '../domain/uses-cases/email/send-email-logs'
import { CronService } from './cron/cron-service'
import { CheckService } from '../domain/uses-cases/checks/check-service'
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource'
import { LogSeverityLevel } from '../domain/entities/log.entity'
import { PostgresLogDataSource } from '../infrastructure/datasources/postgres-log.datasource'
import { CheckServiceMultiple } from '../domain/uses-cases/checks/check-service -multiple'

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource())
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource())
const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDataSource())

const emailService = new EmailService()
export class Server {
  public static async start() {
    console.log('Server started')

    // para que pueda funcionar dentro del execute debes hacer lo siguiente: poner los correos que necesites inviarles informacion
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(['correo1@gmail.com','correo2@gmail.com'])

    // new SendEmailLogs(emailService, logRepository).execute([''])

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'http://google.com'
    //   new CheckServiceMultiple(
    //     [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log(`${url} is ok`),
    //     error => console.log(error)
    //   ).execute(url)
    // })

    // const logs = await logRepository.getLogs(LogSeverityLevel.high)
    // console.log(logs)
  }
}
