<!-- src/pages/WebConsolePage.vue -->
<template>
  <q-page class="q-pa-md-xl ">
      <q-header class="bg-transparent" >
          <div class="row">
            <div class="col-4">

              <div class="row">
                <q-btn flat dense round icon="refresh" @click="reloadWebview" tip="Reload Webview" />
                <q-btn flat dense round icon="clear_all" @click="clearLogs" tip="Clear Logs" />
              </div>
              <div class="row">
                <web-console-panel :consoleLines="consoleLines" @send-command="sendCommand" />
              </div>
            </div>
            <div class="col-8  q-card--bordered" >
              <q-input model-value="" type="textarea" label="JavaScript Console" readonly></q-input>
            </div>
          </div>
      </q-header>

    <div class="row">
      <webview ref="wv" src="https://www.google.com" @dom-ready="onReady" class="fit" />
    </div>
  </q-page>
</template>

<script>
import WebConsolePanel from 'components/WebConsolePanel.vue'

export default {
  name: 'WebConsolePage',
  components: { WebConsolePanel },
  data() {
    return { consoleLines: [] }
  },
  methods: {
    getElectronApi() {
      if (window && window.electronAPI) {
        return window.electronAPI
      } else {
        if (window) {
          this.$q.notify({ message: 'Electron API nicht verfügbar', type: 'error' })
          throw new Error('Electron API nicht verfügbar')
        } else {
          this.$q.notify({ message: 'Window nicht verfügbar', type: 'error' })
          throw new Error('Window nicht verfügbar')
        }
      }
    },

    getWebView() {
      if (this.$refs && this.$refs.wv) {
        return this.$refs.wv
      } else {
        this.$q.notify({ message: 'Webview nicht verfügbar', type: 'error' })
        throw new Error('Webview nicht verfügbar')
      }
    },

    onReady() {
      this.getElectronApi().onConsole((msg) => {
        this.consoleLines.push(msg)
        this.$nextTick(() => {
          const content = this.$el.querySelector('.q-scroll-area__content')
          if (content) content.scrollTop = content.scrollHeight
        })
      })
      this.$q.notify({ message: 'onConsole()-Event registriert', type: 'info' })
    },

    sendCommand(cmd) {
      this.getElectronApi().sendCommand(cmd)
    },

    reloadWebview() {
      this.getWebView().reload()
      this.$q.notify({ message: 'Webview neu geladen', type: 'info' })
    },

    clearLogs() {
      this.consoleLines = []
      this.$q.notify({ message: 'Logs gelöscht', type: 'warning' })
    },
  },
}
</script>

<style>
.fit {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
