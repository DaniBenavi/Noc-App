import fs from 'fs'
import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = 'logs/'
  private readonly allLogsPath = 'logs/logs.all.path'
  private readonly mediumLogsPath = 'logs/logs.medium.path'
  private readonly highLogsPath = 'logs/logs.high.path'

  constructor() {
    this.createLogFiles()
  }

  private createLogFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    ;[this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(path => {
      if (fs.existsSync(path)) return
      fs.writeFileSync(path, '')
    })
  }

  async savelog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`

    fs.appendFileSync(this.allLogsPath, logAsJson)

    if (newLog.level === LogSeverityLevel.low) return

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson)
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson)
    }
  }

  private getLogsFromFile = (filePath: string): LogEntity[] => {
    const content = fs.readFileSync(filePath, 'utf-8')

    const logs = content.split('\n').map(log => LogEntity.fromJson(log))

    return logs
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath)

      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath)

      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath)

      default:
        throw new Error(`${severityLevel} not implemented`)
    }
  }
}
