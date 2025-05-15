<!-- src/components/WebConsolePanel.vue -->
<template>
  <q-card flat class="full-height">
    <q-card-section class="full-height q-pa-none">
      <q-scroll-area class="full-height">
        <div v-for="(line, i) in consoleLines" :key="i">{{ line }}</div>
      </q-scroll-area>
    </q-card-section>
    <q-card-actions class="q-pa-sm">
      <q-input
        v-model="command"
        @keyup.enter="emitCommand"
        placeholder="JavaScript hier eingeben…"
        type="textarea"
        autogrow
        dense
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'WebConsolePanel',
  emits: ['send-command'],
  props: {
    consoleLines: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      command: ''
    }
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
.full-height {
  height: 100%;
}
</style>
