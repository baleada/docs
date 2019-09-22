<template lang="html">
  <main>
    <DocsNav />
    <nuxt />
  </main>
</template>

<script>
import DocsNav from '~/components/DocsNav.vue'

export default {
  components: {
    DocsNav
  },
}
</script>
