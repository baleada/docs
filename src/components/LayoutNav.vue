<template lang="html">
  <nav class="flex flex-col h-screen bg-primary-1000 text-primary-200">
    <div class="mb-2 w-full h-px rounded-full bg-primary-300"></div>
    <NuxtLink
      v-for="(page, index) in pages"
      :key="page.href"
      :to="page.href"
      class="mt-2 hover:text-primary-100"
    >
      {{ page.name }}
    </NuxtLink>
  </nav>
</template>

<script>
import allPages from '../static/json/pages.json'

export default {
  setup() {
    const pages = allPages.filter(page => page.main)

    return {
      pages
    }
  }
}
</script>
