<template>
  <div class="with-mt mx-auto w-full with-max-w flex-col center-all-x">
    <p>Status: <code>{{ hover.status.value }}</code></p>
    <div
      :ref="api.ref()"
      class="with-mt d-14 rounded-6"
      :class="[
        hover.is.hovered() ? 'bg-primary-40 dork:bg-primary-90' : 'bg-gray-30 dork:bg-primary-gray-100',
      ]"
    />
  </div>
</template>

<script setup lang="tsx">
import { useElementApi, useHover } from '@baleada/vue-features'

const api = useElementApi()
const hover = useHover(api.element)
</script>
