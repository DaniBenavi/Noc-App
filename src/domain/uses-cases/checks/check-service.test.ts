import { LogEntity } from '../../entities/log.entity'
import { CheckService } from './check-service'

describe('check service', () => {
  const mockRepository = {
    savelog: jest.fn(),
    getLogs: jest.fn()
  }

  const succesCallback = jest.fn()
  const errorCallback = jest.fn()

  const checkService = new CheckService(mockRepository, succesCallback, errorCallback)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('check service call fetch return true', async () => {
    const wasOk = await checkService.execute('https://www.google.com')

    expect(wasOk).toBe(true)

    expect(succesCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()

    expect(mockRepository.savelog).toHaveBeenCalledWith(expect.any(LogEntity))
  })

  test('should call when fetch return false', async () => {
    const wasOk = await checkService.execute('https://wwedww.google.com')

    expect(wasOk).toBe(false)

    expect(succesCallback).not.toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalled()

    expect(mockRepository.savelog).toHaveBeenCalledWith(expect.any(LogEntity))
  })
})
