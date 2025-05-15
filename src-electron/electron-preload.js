import { contextBridge, ipcRenderer } from 'electron'

window.addEventListener('DOMContentLoaded', () => {
  const wvs = document.getElementsByTagName('webview')
  Array.from(wvs).forEach(wv => {
    wv.addEventListener('console-message', e => {
      const levelMap = { 0: 'log', 1: 'warn', 2: 'error', 3: 'debug' }
      const lvl = levelMap[e.level] || 'log'
      ipcRenderer.send('webview-console', `[${lvl}] ${e.message}`)
    })
    wv.addEventListener('did-fail-load', e => {
      ipcRenderer.send(
        'webview-console',
        `[error] Webview load failed: ${e.errorDescription} (${e.errorCode})`
      )
    })
  })
})

contextBridge.exposeInMainWorld('electronAPI', {
  onConsole: cb => ipcRenderer.on('webview-console', (_, msg) => cb(msg)),
  sendCommand: cmd => ipcRenderer.send('send-webview', cmd)
})

ipcRenderer.on('send-webview', (_, cmd) => {
  const wvs = document.getElementsByTagName('webview')
  Array.from(wvs).forEach(wv => {
    wv.executeJavaScript(cmd).catch(err => {
      ipcRenderer.send('webview-console', `[error] Exec failed: ${err.message}`)
    })
  })
})
