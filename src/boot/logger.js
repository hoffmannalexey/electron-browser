import { boot } from 'quasar/wrappers'
import path from 'path'
import log from 'electron-log'

export default boot(() => {
  log.transports.rendererConsole = true
  log.transports.file.resolvePath = () =>
    path.join(
      process.env.APPDATA || process.env.HOME,
      'electron-browser',
      'logs',
      'renderer.log'
    )
})
