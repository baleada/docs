<template>
  <section class="mt-12 with-max-w mx-auto flex flex-col sm:flex-row">
    <RouterLink
      v-if="previous !== undefined"
      :to="previous.href"
      class="btn btn-lg mx-auto sm:ml-0 p-0 no-underline"
    >
      <HeroiconsChevronDoubleLeft class="icon" />
      <span class="hover:no-underline">{{ previous.title }}</span>
    </RouterLink>
    <RouterLink
      v-if="next !== undefined"
      :to="next.href"
      class="btn btn-lg mt-2 sm:mt-0 p-0 mx-auto sm:mr-0 no-underline"
    >
      <span class="hover:no-underline">{{ next.title }}</span>
      <HeroiconsChevronDoubleRight class="icon" />
    </RouterLink>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useContext } from '@baleada/vue-prose'
import { clipable } from '@baleada/logic'
import { HeroiconsChevronDoubleLeft, HeroiconsChevronDoubleRight } from '@baleada/vue-heroicons'
import manifest from '../state/manifest'

const articles = manifest.reduce((articles, entry) => [...articles, ...entry.articles], [])

export default {
  name: 'LayoutAdjacentArticleLinks',
  components: {
    HeroiconsChevronDoubleLeft,
    HeroiconsChevronDoubleRight
  },
  setup () {
    const fullPath = computed(() => useContext().fullPath),
          currentIndex = computed(() => {
            const basePath = `${clipable(fullPath.value).clip(/#.+$/)}`
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
    articleHref === `${clipable(basePath).clip(/\/$/)}` ||
    articleHref === `${basePath}/`.replace(/\/+$/,'/')
  )
}
</script>
