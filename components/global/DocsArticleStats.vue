<template>
  <p class="text-1 italic">
    Updated on {{ intl }}
  </p>
</template>

<script>
import { computed, inject } from '@vue/composition-api'

import { useSymbol } from '@baleada/prose/vue'

export default {
  // props: {
  //   stats: {
  //     type: Object,
  //     required: true,
  //   }
  // },
  setup () {
    const stats = inject(useSymbol('article', 'stats')) // This should work with scoped slot and props but it doesn't so I'm doing provide/inject

    const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          date = computed(() => new Date(stats.value.mtime)),
          intl = computed(() => `${months[date.value.getMonth()]} ${date.value.getDate()}, ${date.value.getFullYear()}`)

    return {
      intl
    }
  }
}
</script>
