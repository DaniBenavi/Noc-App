import { envs } from './env.plugins'

describe('envs.plugin.ts', () => {
  test('should return env options', () => {
    //console.log(envs)

    expect(envs).toEqual({
      PORT: 3000,
      MAIL_SERVICE: 'gmail',
      MAILER_SECRET_KEY: 'rrapxikdhhoornua',
      MAILER_EMAIL: 'darksoul032022@gmail.com',
      PROD: true,
      MONGO_URL: 'mongodb://Danidev:123456@localhost:27017/',
      MONGO_DB_NAME: 'Noc-test',
      MONGO_USER: 'Danidev',
      MONGO_PASS: '123456'
    })
  })

  test('should return error if not found env', async () => {
    jest.resetModules()
    process.env.PORT = 'ABC'

    //console.log(envs)

    try {
      await import('./env.plugins')

      expect(true).toBe(false)
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer')
    }
  })
})
