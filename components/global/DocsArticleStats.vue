<template>
  <p class="mb-7 text-3 italic">
    Updated on {{ intl }}
  </p>
</template>

<script>
import { computed, inject } from '@vue/composition-api'

import { useSymbol } from '@baleada/vue-prose'

import metadata from '~/static/json/metadata.json'

export default {
  // props: {
  //   stats: {
  //     type: Object,
  //     required: true,
  //   }
  // },
  setup () {
    const stats = inject(useSymbol('article', 'stats')), // This should work with scoped slot and props but it doesn't so I'm doing provide/inject. This also doesn't work with Netlify builds so I'm not using it at all.
          frontMatter = inject(useSymbol('article', 'frontMatter')),
          title = computed(() => frontMatter.value.title),
          mtime = computed(() => metadata.find(({ title: t }) => t === title.value).updatedAt),
          months = [
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
          date = computed(() => new Date(mtime.value)),
          intl = computed(() => `${months[date.value.getMonth()]} ${date.value.getDate()}, ${date.value.getFullYear()}`)

    return {
      intl
    }
  }
}
</script>
