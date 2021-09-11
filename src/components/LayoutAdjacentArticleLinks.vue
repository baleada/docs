<template>
  <section class="mt-12 with-max-w mx-auto flex flex-col sm:flex-row">
    <RouterLink
      v-if="previous !== undefined"
      :to="previous.href"
      class="btn btn-lg mx-auto sm:ml-0 p-0 no-underline"
    >
      <HeroiconsChevronDoubleLeft class="icon icon-btn" />
      <span class="hover:no-underline">{{ previous.title }}</span>
    </RouterLink>
    <RouterLink
      v-if="next !== undefined"
      :to="next.href"
      class="btn btn-lg mt-2 sm:mt-0 p-0 mx-auto sm:mr-0 no-underline"
    >
      <span class="hover:no-underline">{{ next.title }}</span>
      <HeroiconsChevronDoubleRight class="icon icon-btn" />
    </RouterLink>
  </section>
</template>

<script lang="ts">
/// <reference types="../../types" />
import { computed } from 'vue'
// @ts-ignore
import { useStore as useProseStore } from '@baleada/vue-prose'
import { createClip } from '@baleada/logic'
// @ts-ignore
import { HeroiconsChevronDoubleLeft, HeroiconsChevronDoubleRight } from '@baleada/vue-heroicons'
import { manifest } from 'virtual:manifest'

const articles = manifest.reduce<typeof manifest[0]['articles']>((articles, entry) => [...articles, ...entry.articles], [])

export default {
  name: 'LayoutAdjacentArticleLinks',
  components: {
    HeroiconsChevronDoubleLeft,
    HeroiconsChevronDoubleRight
  },
  setup () {
    const fullPath = computed(() => useProseStore().fullPath),
          currentIndex = computed(() => {
            const basePath = createClip(/#.+$/)(fullPath.value)
            return articles.findIndex(article => routeMatches(article.href, basePath))
          }),
          previous = computed(() => currentIndex.value - 1 === -1 ? undefined : articles[currentIndex.value - 1]),
          next = computed(() => currentIndex.value + 1 > articles.length ? undefined : articles[currentIndex.value + 1])

    return {
      previous,
      next,
    }
  }
}

function routeMatches (articleHref, basePath) {
  return (
    articleHref === basePath ||
    articleHref === createClip(/\/$/)(basePath) ||
    articleHref === `${basePath}/`.replace(/\/+$/,'/')
  )
}
</script>
