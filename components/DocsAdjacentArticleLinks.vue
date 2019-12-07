<template lang="html">
  <section class="with-max-w flex flex-col sm:flex-row">
    <NuxtLink
      v-if="previous !== undefined"
      :to="previous.href"
      class="btn btn-grows mx-auto sm:ml-0"
    >
    <!-- :class="[
      isDarkTheme ? 'text-primary-200' : 'text-primary-600'
    ]" -->
      <EvaArrowheadLeft :class="'icon'"/>
      <span class="hover:no-underline">{{ previous.title }}</span>
    </NuxtLink>
    <NuxtLink
      v-if="next !== undefined"
      :to="next.href"
      class="btn btn-grows mt-2 sm:mt-0 mx-auto sm:mr-0"
    >
    <!-- :class="[
      isDarkTheme ? 'text-primary-200' : 'text-primary-600'
    ]" -->
      <span class="hover:no-underline">{{ next.title }}</span>
      <EvaArrowheadRight :class="'icon'"/>
    </NuxtLink>
  </section>
</template>

<script>
import { computed, watch, inject } from '@vue/composition-api'

import { useSymbol } from '@baleada/prose/vue'

import manifest from '~/static/json/manifest.json'

import { EvaArrowheadLeft, EvaArrowheadRight } from '@baleada/icons/vue'

export default {
  name: 'DocsAdjacentArticleLinks',
  components: {
    EvaArrowheadLeft,
    EvaArrowheadRight
  },
  setup() {
    const pages = manifest.reduce((pages, entry) => pages.concat(entry.pages), []),
          routeMatches = (pageHref, basePath) => {
            return (
              pageHref === basePath ||
              pageHref === basePath.replace(/\/$/,'') ||
              pageHref === `${basePath}/`.replace(/\/+$/,'/')
            )
          },
          fullPath = inject(useSymbol('layout', 'fullPath')),
          currentIndex = computed(() => {
            const basePath = fullPath.value.split('#')[0]
            return pages.findIndex(page => routeMatches(page.href, basePath))
          }),
          previous = computed(() => currentIndex.value - 1 === -1 ? undefined : pages[currentIndex.value - 1]),
          next = computed(() => currentIndex.value + 1 > pages.length ? undefined : pages[currentIndex.value + 1])

    return {
      previous,
      next,
    }
  }
}
</script>
