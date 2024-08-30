<template>
  <div class="mx-auto w-full with-max-w flex-col center-all-x">
    <p class="text-3">Scroll to bring the element into view:</p>
    <div class="
      with-mt w-16 h-20 p-4 scroll-p-4 overflow-y-scroll
      ring-sh-2-gray-30 dork:ring-primary-gray-100
      rounded-3 scrollbar-hide
    ">
      <div
        :ref="api.ref()"
        class="my-22 d-14 rounded-6 bg-primary-40 dork:bg-primary-90"
      />
    </div>
    <p>Status: <code>{{ intersection.status.value }}</code></p>
  </div>
</template>

<script setup lang="tsx">
import { useElementApi, useIntersection } from '@baleada/vue-features'

const api = useElementApi()
const intersection = useIntersection(api.element)
</script>
