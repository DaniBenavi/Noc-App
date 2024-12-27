import mongoose from 'mongoose'
import { envs } from '../../config/plugins/env.plugins'
import { logModel, MongoDatabase } from '../../data/mongo'
import { MongoLogDatasource } from './mongo-log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

describe('Mongo logtadasource', () => {
  const logDataSource = new MongoLogDatasource()

  const log = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts'
  })
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    })
  })

  afterEach(async () => {
    await logModel.deleteMany()
  })

  afterAll(async () => {
    mongoose.connection.close()
  })

  test('should create a logtado', async () => {
    const logSpy = jest.spyOn(console, 'log')

    await logDataSource.savelog(log)

    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith('Mongo log created', expect.any(String))
  })

  test('should get logs', async () => {
    await logDataSource.savelog(log)

    const logs = await logDataSource.getLogs(LogSeverityLevel.medium)

    expect(logs.length).toBe(1)
    expect(logs[0].level).toBe(LogSeverityLevel.medium)
  })
})
