<template lang="html">
  <p class="mt-10 text-center sm:text-left">
    <a class="btn btn-lg p-0" :href="gitPath">
      <SimpleGitLab :class="'icon'" />
      <span>Edit on GitLab</span>
    </a>
  </p>
</template>

<script>
import { ref, computed, inject } from '@vue/composition-api'

import { useSymbol } from '@baleada/prose/vue'

import { SimpleGitLab } from '@baleada/icons/vue'

export default {
  components: {
    SimpleGitLab,
  },
  setup() {
    const filePath = inject(useSymbol('article', 'filePath')),
          gitPath = computed(() => {
            const path = filePath.value.match(/\/assets\/md\/.+$/)
            return path[0] && `https://gitlab.com/baleada/docs/tree/master${path[0]}`
          })

    return {
      gitPath
    }
  },
}
</script>
