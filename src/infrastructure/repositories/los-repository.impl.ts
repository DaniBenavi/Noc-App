import { log } from 'console'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
import { LogRepository } from '../../domain/repository/log.repository'

export class LogRepositoryImpl implements LogRepository {
  // inyecion de dependencia
  constructor(private readonly logDataSource: LogDataSource) {}

  async savelog(log: LogEntity): Promise<void> {
    this.logDataSource.savelog(log)
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel)
  }
}
