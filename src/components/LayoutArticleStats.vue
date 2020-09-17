<template>
  <p class="mb-7 text-3 italic">
    Updated on {{ intl }}
  </p>
</template>

<script>
import { computed } from 'vue'
import { useContext } from '@baleada/vue-prose'

export default {
  setup () {
    const authorDate = computed(() => useContext().article.stats.authorDate), // Date of last git commit
          intl = computed(() =>
            new Intl.DateTimeFormat('en-us', { dateStyle: 'long' })
              .format(
                new Date(toParseable(authorDate.value))
              )
          )

    return {
      intl
    }
  }
}

function toParseable (authorDate) {
  return authorDate.replace(/ /, 'T').replace(/ /, '')
}
</script>
