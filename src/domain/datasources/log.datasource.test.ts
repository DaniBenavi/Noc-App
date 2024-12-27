import { LogEntity, LogSeverityLevel } from '../entities/log.entity'
import { LogDataSource } from './log.datasource'

describe('test in log.datasource.ts', () => {
  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test message',
    level: LogSeverityLevel.low
  })

  class MockLogDataSource implements LogDataSource {
    async savelog(log: LogEntity): Promise<void> {
      return
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog]
    }
  }

  test('should test abstract class', async () => {
    const mockLogDataSource = new MockLogDataSource()

    expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource)
    expect(typeof mockLogDataSource.savelog).toBe('function')
    expect(typeof mockLogDataSource.getLogs).toBe('function')

    await mockLogDataSource.savelog(newLog)

    const logs = await mockLogDataSource.getLogs(LogSeverityLevel.high)
    expect(logs).toHaveLength(1)
    expect(logs[0]).toBeInstanceOf(LogEntity)

    console.log(mockLogDataSource.getLogs)
  })
})
