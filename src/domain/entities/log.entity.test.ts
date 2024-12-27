import { LogEntity, LogSeverityLevel } from './log.entity'

describe('logEntity', () => {
  const dataObj = {
    message: 'Hola',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts'
  }

  // create a new log
  test('should create a log entity instance', () => {
    const log = new LogEntity(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  // from json
  test('from json', () => {
    const jsonString = `{"level":"low","message":"Service http://google.com running","createdAt":"2024-10-31T03:50:15.575Z","origin":"check-service.ts"}`

    const log = LogEntity.fromJson(jsonString)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe('Service http://google.com running')
    expect(log.level).toBe(LogSeverityLevel.low)
    expect(log.origin).toBe('check-service.ts')
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  test('should create a logentity instance from object', () => {
    const log = LogEntity.fromObject(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
  })
})
