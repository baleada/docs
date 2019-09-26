<template lang="html">
  <section class="adjacent-article-links flex flex-col sm:flex-row">
    <NuxtLink v-if="previous !== undefined" :to="previous.href" class="btn btn-grows mr-auto">
      <div class="inline-flex items-center text-primary-600">
        <EvaArrowheadLeft :class="'icon'"/>
        <span class="hover:no-underline">{{ previous.title }}</span>
      </div>
    </NuxtLink>
    <NuxtLink v-if="next !== undefined" :to="next.href" class="mt-2 sm:mt-0 btn btn-grows ml-auto">
      <div class="inline-flex items-center text-primary-600">
        <span class="hover:no-underline">{{ next.title }}</span>
        <EvaArrowheadRight :class="'icon'"/>
      </div>
    </NuxtLink>
  </section>
</template>

<script>
import { computed, watch } from '@vue/composition-api'

import directories from '~/static/json/manifest.json'

import { EvaArrowheadLeft } from '@baleada/icons/vue'
import { EvaArrowheadRight } from '@baleada/icons/vue'

export default {
  components: {
    EvaArrowheadLeft,
    EvaArrowheadRight
  },
  props: {
    fullPath: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const pages = directories.reduce((pages, directory) => pages.concat(directory.pages), []),
          routeMatches = (pageHref, basePath) => {
            return (
              pageHref === basePath ||
              pageHref === basePath.replace(/\/$/,'') ||
              pageHref === `${basePath}/`.replace(/\/+$/,'/')
            )
          },
          currentIndex = computed(() => {
            const basePath = props.fullPath.split('#')[0]
            return pages.findIndex(page => routeMatches(page.href, basePath))
          }),
          previous = computed(() => currentIndex.value - 1 === -1 ? undefined : pages[currentIndex.value - 1]),
          next = computed(() => currentIndex.value + 1 > pages.length ? undefined : pages[currentIndex.value + 1])

    return {
      previous,
      next
    }
  }
}
</script>
