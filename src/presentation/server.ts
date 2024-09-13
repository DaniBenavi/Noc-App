import { error } from 'console'
import { CheckService } from '../domain/uses-cases/checks/check-service'
import { CronService } from './cron/cron-service'

export class Server {
  public static start() {
    console.log('Server started')

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com'
      new CheckService(
        () => console.log(`${url} is ok`),
        () => console.log(error)
      ).execute(url)
    })
  }
}
