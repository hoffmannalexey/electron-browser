<!-- src/pages/WebConsolePage.vue -->
<template>
  <q-layout view="hHh lpR fff">
    <q-page class="full-height">
      <div class="column full-height">
        <div class="q-pa-sm" style="flex: 0 0 70%;">
          <webview
            ref="wv"
            src="https://www.google.com"
            class="full-width full-height"
            @dom-ready="onReady"
          />
        </div>
        <div class="q-pa-sm" style="flex: 0 0 30%;">
          <web-console-panel
            :consoleLines="consoleLines"
            @send-command="sendCommand"
          />
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import WebConsolePanel from 'components/WebConsolePanel.vue'

export default {
  name: 'WebConsolePage',
  components: { WebConsolePanel },
  data() {
    return {
      consoleLines: []
    }
  },
  methods: {
    onReady() {
      this.$q.notify('Webview geladen')
      window.electronAPI.onConsole(msg => {
        this.consoleLines.push(msg)
        this.$nextTick(() => {
          const content = this.$el.querySelector(
            '.q-scroll-area__content'
          )
          if (content) {
            content.scrollTop = content.scrollHeight
          }
        })
      })
    },
    sendCommand(cmd) {
      window.electronAPI.sendCommand(cmd)
    }
  }
}
</script>

<style>
.full-height {
  height: 100%;
}
.full-width {
  width: 100%;
}
.column {
  display: flex;
  flex-direction: column;
}
</style>
