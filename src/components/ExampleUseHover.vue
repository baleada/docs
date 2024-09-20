<template>
  <div
    class="
      relative
      mx-auto w-full with-max-w flex-col center-all py-6
      ring-sh-2-gray-40 dork:ring-primary-gray-100 rounded-6
    "
  >
    <div class="text-3 absolute top-2 left-2 pointer-events-none select-none flex flex-col gap-1">
      <div class="flex items-center gap-1">
        <OcticonsStopwatch16 class="w-4 h-4 text-inherit" />
        <code>{{ hover.descriptor.value?.metadata?.duration ?? 0 }}ms</code>
      </div>
    </div>
    <p class="mt-0 text-3">Hover this element:</p>
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
import OcticonsStopwatch16 from '@octicons/stopwatch-16.svg'

const api = useElementApi()
const hover = useHover(api.element)
</script>
