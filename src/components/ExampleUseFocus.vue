<template>
  <div class="mx-auto w-full with-max-w flex-col center-all-x">
    <p class="text-3">Focus this element:</p>
    <div
      :ref="api.ref()"
      tabindex="0"
      class="with-mt d-14 rounded-6 focus:outline-none"
      :class="[
        focus.is.focused() ? 'bg-primary-40 dork:bg-primary-90' : 'bg-gray-30 dork:bg-primary-gray-100',
      ]"
    />
    <p>Status: <code>{{ focus.status.value }}</code></p>
  </div>
</template>

<script setup lang="tsx">
import { useElementApi, useFocus } from '@baleada/vue-features'

const api = useElementApi()
const focus = useFocus(api.element)
</script>
