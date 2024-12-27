import fs from 'fs'
import path from 'path'
import { FileSystemDataSource } from './file-system.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

describe('FileSystemDataSource', () => {
  const logPath = path.join(__dirname, '../../../logs')
  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true })
  })

  test('should create file logs if they do not exist', () => {
    new FileSystemDataSource()

    const files = fs.readdirSync(logPath)

    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
  })

  test('should save a log in all logs files', () => {
    const logDatasource = new FileSystemDataSource()

    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts'
    })

    logDatasource.savelog(log)

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    console.log(allLogs)

    expect(allLogs).toContain(JSON.stringify(log))
  })

  test('should save a log in all-logs.log and logs-medium.log files', () => {
    const logDatasource = new FileSystemDataSource()

    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts'
    })

    logDatasource.savelog(log)

    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')
    console.log(mediumLogs)

    expect(mediumLogs).toContain(JSON.stringify(log))
  })

  test('should save a log in all-logs.log and logs-high.log files', () => {
    const logDatasource = new FileSystemDataSource()

    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts'
    })

    logDatasource.savelog(log)

    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')
    console.log(highLogs)

    expect(highLogs).toContain(JSON.stringify(log))
  })

  test('should return logs', async () => {
    const logDatasource = new FileSystemDataSource()
    const logLow = new LogEntity({
      message: 'log-low',
      level: LogSeverityLevel.low,
      origin: 'low'
    })
    const logMedium = new LogEntity({
      message: 'log-medium',
      level: LogSeverityLevel.medium,
      origin: 'medium'
    })
    const logHigh = new LogEntity({
      message: 'log-high',
      level: LogSeverityLevel.high,
      origin: 'high'
    })

    await logDatasource.savelog(logLow)
    await logDatasource.savelog(logMedium)
    await logDatasource.savelog(logHigh)

    const logsLow = await logDatasource.getLogs(LogSeverityLevel.low)
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium)
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high)

    expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]))
    expect(logMedium).toEqual(expect.arrayContaining([logMedium]))
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]))
  })

  test('should not and error if path exists', () => {
    new FileSystemDataSource()
    new FileSystemDataSource()

    expect(true).toBeTruthy()
  })

  test('should throw and error if severity level is not defined', async () => {
    const logDatasource = new FileSystemDataSource()

    const customSeverityLevel = 'SUPER_HIGH' as LogSeverityLevel

    try {
      await logDatasource.getLogs(customSeverityLevel)
      expect(true).toBeFalsy()
    } catch (error) {
      const errorString = `${error}`

      expect(errorString).toContain(`${customSeverityLevel} not implemented`)
    }
  })


})
