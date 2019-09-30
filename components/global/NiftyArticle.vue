<template lang="html">
  <article class="flex-1 long-form px-7 sm:px-9 lg:pl-11 pb-12 pt-11 lg:mr-10 transition">
    <NiftyHeading level="1">
      {{ title }}
    </NiftyHeading>
    <UpdatedAt :timestamp="updatedAt" />
    <slot />
    <AdjacentArticleLinks
      class="mt-10"
      :fullPath="fullPath"
    />
  </article>
</template>

<script>
import { computed, watch } from '@vue/composition-api'
import useRouter from '~/assets/js/useRouter'

import AdjacentArticleLinks from '~/components/AdjacentArticleLinks.vue'

export default {
  name: 'NiftyArticle',
  components: {
    AdjacentArticleLinks,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: String,
      required: true,
    }
  },
  // TODO: move vue-meta logic into setup
  head: () => ({
    // title: this.title,
  }),
  setup() {
    /* Track route */
    const { route } = useRouter(),
          fullPath = computed(() => route.value.fullPath)


    /* Things to do when page is loaded */
    function onLoad (container) {
      // highlightCode()
      scrollToHeader(fullPath, { container })
      // wrapElements({
      //   container,
      //   classes: ['table-wrapper', 'scrollable'],
      //   selector: 'table'
      // })
    }
    let timeoutID
    watch(
      fullPath,
      () => {

      }
    )

    return {
      fullPath
    }
  },
}
</script>
