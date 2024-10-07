import { logModel } from '../../data/mongo'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

export class MongoLogDatasource implements LogDataSource {
  async savelog(log: LogEntity): Promise<void> {
    const newLog = await logModel.create(log)
    console.log('Mongo log created', newLog.id)
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await logModel.find({
      level: severityLevel
    })
    return logs.map(LogEntity.fromObject)
  }
}
