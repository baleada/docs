<template lang="html">
  <p class="mt-8 text-center">
    <a
      class="btn btn-sm p-0 no-underline"
      :href="gitRepoPath"
    >
      <SimpleGitHub class="icon" />
      <span>Edit on GitHub</span>
    </a>
  </p>
</template>

<script>
import { computed } from 'vue'
import { useContext } from '@baleada/vue-prose'
import { SimpleGitHub } from '@baleada/vue-simple-icons'

export default {
  components: {
    SimpleGitHub,
  },
  setup () {
    const gitRepoPath = computed(() => `https://github.com/baleada/docs/blob/main${useContext().article.relativePath}`)

    return { gitRepoPath }
  },
}
</script>
