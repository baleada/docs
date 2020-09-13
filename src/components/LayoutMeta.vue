<template></template>

<script>
import { onMounted, computed, inject } from '@vue/composition-api'

import { useSymbol } from '@baleada/vue-prose'

export default {
  setup (props) {
    const frontMatter = inject(useSymbol('article', 'frontMatter')),
          title = computed(() => frontMatter.value.title)

    onMounted(() => (document.title = title.value))
  },
}
</script>
