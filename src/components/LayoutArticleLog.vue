<template>
  <span class="block text-3 italic">
    Updated on {{ intl }}
  </span>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useStore } from '../composition'

export default {
  name: 'LayoutArticleLog',
  setup () {
    const authorDate = computed(() => useStore()?.article?.log[0]?.authorDate || ''), // Date of last git commit
          intl = computed(() => {
            const intl = new Intl.DateTimeFormat('en-us', { dateStyle: 'long' })
              
            try {
              return intl.format(new Date(toParseable(authorDate.value)))
            } catch (e) {
              return 'unknown'
            }
          })

    return {
      intl
    }
  }
}

function toParseable (authorDate) {
  return authorDate.replace(/ /, 'T').replace(/ /, '')
}
</script>
