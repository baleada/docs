<template lang="html">
  <p class="mt-8 text-center">
    <a class="btn btn-sm p-0 no-underline" :href="gitPath">
      <SimpleGitHub :class="'icon'" />
      <span>Edit on GitHub</span>
    </a>
  </p>
</template>

<script>
import { ref, computed, inject } from '@vue/composition-api'

import { useSymbol } from '@baleada/vue-prose'

import { SimpleGitHub } from '@baleada/vue-icons'

export default {
  components: {
    SimpleGitHub,
  },
  setup () {
    const filePath = inject(useSymbol('article', 'filePath')),
          gitPath = computed(() => {
            const path = filePath.value.match(/\/assets\/prose\/.+$/)
            return path[0] && `https://github.com/baleada/docs/blob/main${path[0]}`
          })

    return {
      gitPath
    }
  },
}
</script>
