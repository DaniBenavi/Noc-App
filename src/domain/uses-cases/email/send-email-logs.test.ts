import { envs } from '../../../config/plugins/env.plugins'
import { LogEntity } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'
import { SendEmailLogs } from './send-email-logs'

describe('sendEmailLogs', () => {
  const mockEmailService = {
    sendEmailWithFyleSystemLogs: jest.fn()
  }

  const mockLogRepository: LogRepository = {
    savelog: jest.fn(),
    getLogs: jest.fn()
  }
  const sendEmailLogs = new SendEmailLogs(mockEmailService as any, mockLogRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should email call and save', async () => {
    mockEmailService.sendEmailWithFyleSystemLogs.mockResolvedValue(true)
    const result = await sendEmailLogs.execute('darksoul032022@gmail.com')

    expect(result).toBe(true)
    expect(mockEmailService.sendEmailWithFyleSystemLogs).toHaveBeenCalledTimes(1)
    expect(mockLogRepository.savelog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockLogRepository.savelog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: 'low',
      message: 'Log email sent',
      origin: 'send-email-logs.ts'
    })
  })

  test('should log in case of error', async () => {
    mockEmailService.sendEmailWithFyleSystemLogs.mockResolvedValue(false)

    const result = await sendEmailLogs.execute('darksoul032022@gmail.com')

    expect(result).toBe(false)
    expect(mockEmailService.sendEmailWithFyleSystemLogs).toHaveBeenCalledTimes(1)
    expect(mockLogRepository.savelog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockLogRepository.savelog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: 'high',
      message: 'Log email sent',
      origin: 'send-email-logs.ts'
    })
  })
})
