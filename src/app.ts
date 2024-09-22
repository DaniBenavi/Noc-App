import { envs } from './config/plugins/env.plugins'
import { Server } from './presentation/server'

// funcion anonima autoinvocada
;(async () => {
  main()
})()

function main() {
  Server.start()

  // console.log(envs)
}
