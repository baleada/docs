<template>
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
import { SimpleGitHub } from '@baleada/vue-simple-icons'
import { useContext } from '../functions'

export default {
  name: 'LayoutArticleEdit',
  components: {
    SimpleGitHub,
  },
  setup () {
    const gitRepoPath = computed(() => `https://github.com/baleada/docs/blob/main/${useContext()?.article?.relativePath}`)

    return { gitRepoPath }
  },
}
</script>
