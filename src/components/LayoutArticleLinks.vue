<template>
  <p class="text-3 italic">
    <a
      class="btn btn-sm p-0 no-underline"
      :href="source"
      target="_blank"
    >
      <SimpleGitHub class="icon icon-btn duration-1" />
      <span class="duration-1">Source code</span>
    </a>
  </p>
</template>

<script lang="ts">
import { computed } from 'vue'
import { SimpleGitHub } from '@baleada/vue-simple-icons'
import { useStore } from '../composition'

export default {
  name: 'LayoutArticleLinks',
  components: {
    SimpleGitHub,
  },
  setup () {
    const source = computed(() => useStore()?.article.source)

    return {
      source
    }
  }
}
</script>
