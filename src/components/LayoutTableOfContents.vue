<template>
  <section class="docs-table-of-contents">
    <h2 class="transition">ON THIS PAGE</h2>
    <RouterLink
      v-for="({ level, slug, text }, index) in headings"
      :key="index"
      :class="[
        `h${level}`,
        `#${slug}` === hash ? 'workaround-exact-active' : '',
      ]"
      :to="`#${slug}`"
    >
      {{ text }}
    </RouterLink>
  </section>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore as useProseStore } from '@baleada/vue-prose'

export default {
  name: 'LayoutTableOfContents',
  setup () {
    const headings = computed(() => useProseStore().headings),
          route = useRoute(),
          hash = computed(() => route.hash)

    return { headings, hash }
  }
}
</script>
