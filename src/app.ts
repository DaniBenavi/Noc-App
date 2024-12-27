import { PrismaClient } from '@prisma/client'
import { envs } from './config/plugins/env.plugins'
import { logModel, MongoDatabase } from './data/mongo'
import { LogRepositoryImpl } from './infrastructure/repositories/log-repository.impl'
import { Server } from './presentation/server'

// funcion anonima autoinvocada
;(async () => {
  main()
})()

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME
  })

  // Crear

  // const newLog = await logModel.create({
  //   message: 'test message',
  //   origin: 'app.ts',
  //   level: 'low'
  // })

  // await newLog.save()
  // console.log(newLog)

  // const logs = await logModel.find()
  // console.log(logs[0].message)
  Server.start()

  // const prisma = new PrismaClient()

  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'MEDIUM',
  //     message: 'Test message',
  //     origin: 'App.ts'
  //   }
  // })

  // const logs = await prisma.logModel.findMany()

  // console.log({ logs })
  // console.log({ newLog })

  // console.log(envs)
}
