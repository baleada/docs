<template lang="html">
  <p class="mt-8 text-center">
    <a class="btn btn-sm p-0 no-underline" :href="gitPath">
      <SimpleGitLab :class="'icon'" />
      <span>Edit on GitLab</span>
    </a>
  </p>
</template>

<script>
import { ref, computed, inject } from '@vue/composition-api'

import { useSymbol } from '@baleada/prose-vue'

import { SimpleGitLab } from '@baleada/icons-vue'

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
