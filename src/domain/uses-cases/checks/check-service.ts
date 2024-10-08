import { LogEntity, LogSeverityLevel } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccesCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly succesCallback: SuccesCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)

      if (!req.ok) {
        throw new Error(`Error on check service ${url}`)
      }

      const log = new LogEntity(LogSeverityLevel.low, `Service ${url} running`)
      this.logRepository.savelog(log)
      this.succesCallback && this.succesCallback()

      return true
    } catch (error) {
      const errorMessage = `${url} is not ok -> ${error}`
      const log = new LogEntity(LogSeverityLevel.high, errorMessage)
      this.logRepository.savelog(log)

      this.errorCallback && this.errorCallback(errorMessage)

      return false
    }
  }
}
