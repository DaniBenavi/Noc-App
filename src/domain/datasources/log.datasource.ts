import { LogEntity, LogSeverityLevel } from '../entities/log.entity'

export abstract class LogDataSource {
  abstract savelog(log: LogEntity): Promise<void>
  abstract getLogs(LogSeverityLevel: LogSeverityLevel): Promise<LogEntity[]>
}
