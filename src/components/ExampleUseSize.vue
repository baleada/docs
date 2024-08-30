<template>
  <div class="mx-auto w-full with-max-w flex-col center-all-x">
    <p class="text-3">Resize this element:</p>
    <div
      :ref="api.ref()"
      class="
        with-mt
        rounded-6 bg-primary-40 dork:bg-primary-90
        overflow-scroll resize
      "
      style="width: 4rem; height: 4rem;"
    >
    </div>
    <p>Height: <code>{{ size.borderBox.value?.height }}</code>, Width: <code>{{ size.borderBox.value?.width }}</code></p>
  </div>
</template>

<script setup lang="tsx">
import { useElementApi, useSize } from '@baleada/vue-features'

const api = useElementApi()
const size = useSize(api.element)
</script>
