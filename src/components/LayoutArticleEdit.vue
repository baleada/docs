<template>
  <p class="mt-8 flex center-all-x">
    <a
      class="flex/2 center-all-y text-3"
      :href="gitRepoPath"
    >
      <SimpleGitHub class="icon icon-btn" />
      <span>Edit doc on GitHub</span>
    </a>
  </p>
</template>

<script lang="ts">
import { computed } from 'vue'
import SimpleGitHub from '@simple-icons/github.svg'
import { useStore } from '../composition'

export default {
  name: 'LayoutArticleEdit',
  components: {
    SimpleGitHub,
  },
  setup () {
    const gitRepoPath = computed(() => `https://github.com/baleada/docs/blob/main/${useStore()?.article?.relativePath}`)

    return { gitRepoPath }
  },
}
</script>
