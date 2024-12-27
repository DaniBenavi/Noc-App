import { LogEntity } from '../../entities/log.entity'
import { CheckServiceMultiple } from './check-service-multiple'

describe('check service', () => {
  const mockRepository1 = {
    savelog: jest.fn(),
    getLogs: jest.fn()
  }
  const mockRepository2 = {
    savelog: jest.fn(),
    getLogs: jest.fn()
  }
  const mockRepository3 = {
    savelog: jest.fn(),
    getLogs: jest.fn()
  }

  const succesCallback = jest.fn()
  const errorCallback = jest.fn()

  const checkService = new CheckServiceMultiple(
    [mockRepository1, mockRepository2, mockRepository3],
    succesCallback,
    errorCallback
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('check service call fetch return true', async () => {
    const wasOk = await checkService.execute('https://www.google.com')

    expect(wasOk).toBe(true)

    expect(succesCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()

    expect(mockRepository1.savelog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepository2.savelog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepository3.savelog).toHaveBeenCalledWith(expect.any(LogEntity))
  })

  test('should call when fetch return false', async () => {
    const wasOk = await checkService.execute('https://wwedww.google.com')

    expect(wasOk).toBe(false)

    expect(succesCallback).not.toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalled()

    expect(mockRepository1.savelog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepository2.savelog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepository3.savelog).toHaveBeenCalledWith(expect.any(LogEntity))
  })
})
