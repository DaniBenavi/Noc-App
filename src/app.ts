import { Server } from './presentation/server'

// funcion anonima autoinvocada
;(async () => {
  main()
})()

function main() {
  Server.start()
}
