<template>
  <p class="mb-7 text-3 italic">
    Updated on {{ intl }}
  </p>
</template>

<script>
import { computed } from 'vue'
import { useContext } from '../functions'

export default {
  name: 'LayoutArticleLog',
  setup () {
    const authorDate = computed(() => useContext()?.article?.log[0]?.authorDate || ''), // Date of last git commit
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
