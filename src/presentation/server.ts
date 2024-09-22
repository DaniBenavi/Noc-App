import { error } from 'console'
import { CheckService } from '../domain/uses-cases/checks/check-service'
import { CronService } from './cron/cron-service'
import { LogRepositoryImpl } from '../infrastructure/repositories/los-repository.impl'
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource'

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource())

export class Server {
  public static start() {
    console.log('Server started')

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com'
      // const url = 'https://localhost:3000'
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is ok`),
        () => console.log(error)
      ).execute(url)
    })
  }
}
