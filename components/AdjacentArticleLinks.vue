<template lang="html">
  <section class="adjacent-article-links flex flex-col sm:flex-row">
    <NuxtLink v-if="previous !== undefined" :to="previous.href" class="btn btn-grows mr-auto">
      <div class="inline-flex items-center text-primary-600">
        <EvaArrowheadLeft />
        <span class="hover:no-underline">{{ previous.title }}</span>
      </div>
    </NuxtLink>
    <NuxtLink v-if="next !== undefined" :to="next.href" class="mt-2 sm:mt-0 btn btn-grows ml-auto">
      <div class="inline-flex items-center text-primary-600">
        <span class="hover:no-underline">{{ next.title }}</span>
        <EvaArrowheadRight />
      </div>
    </NuxtLink>
  </section>
</template>

<script>
import { computed } from '@vue/composition-api'

import directories from '~/assets/json/manifest.json'

import { EvaArrowheadLeft } from '@baleada/icons/vue'
import { EvaArrowheadRight } from '@baleada/icons/vue'

export default {
  components: {
    EvaArrowheadLeft,
    EvaArrowheadRight
  },
  props: {
    route: {
      required: true
    }
  },
  setup({ route }) {
    const pages = directories.reduce((pages, directory) => pages.concat(directory.pages), []),
          routeMatches = (pageHref, basePath) => {
            return (
              pageHref === route.fullPath ||
              pageHref === route.fullPath.replace(/\/$/,'') ||
              pageHref === `${route.fullPath}/`.replace(/\/+$/,'/')
            )
          },
          basePath = computed(() => route.fullPath.split('#')[0]),
          currentIndex = computed(() => pages.findIndex(page => routeMatches(page.href, basePath.value))),
          previous = computed(() => currentIndex.value - 1 === -1 ? undefined : pages[currentIndex.value - 1]),
          next = computed(() => currentIndex.value + 1 > pages.length ? undefined : pages[currentIndex.value + 1])

    return {
      previous,
      next
    }
  }
}
</script>
