<!-- src/components/WebConsolePanel.vue -->
<template>
  <q-card flat class="full-height flex flex-column">
    <q-card-section class="full-height q-pa-none">


      <q-scroll-area class="full-height">
        <div v-for="(line, i) in consoleLines" :key="i">{{ line }}</div>
      </q-scroll-area>
    </q-card-section>
    <q-separator />
    <q-card-actions class="q-pa-xs row items-center">
      <q-input
        v-model="command"
        @keyup.enter="emitCommand"
        placeholder="JavaScript hier eingeben…"
        type="textarea"
        autogrow
        dense
        class="col"
      />
      <q-btn
        flat
        dense
        icon="send"
        @click="emitCommand"
        :disable="!command"
        color="primary"
        label="Send"
        class="q-ml-sm"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'WebConsolePanel',
  emits: ['send-command'],
  props: {
    consoleLines: Array
  },
  data() {
    return { command: '' }
  },
  methods: {
    emitCommand() {
      if (!this.command) return
      this.$emit('send-command', this.command)
      this.command = ''
    }
  }
}
</script>

<style scoped>
.full-height { height: 100%; }
</style>
