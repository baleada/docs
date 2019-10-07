<template lang="html">
  <article class="flex-1 long-form px-7 sm:px-9 lg:pl-11 pb-12 pt-11 lg:mr-10 transition">
    <NiftyHeading level="1">
      {{ title }}
    </NiftyHeading>
    <UpdatedAt :timestamp="updatedAt" />
    <slot />
    <section class="mt-10 with-max-w flex justify-center sm:justify-start">
      <a class="btn btn-grows text-gray-600" :href="repoLink">
        <SimpleGitLab :class="'icon'" />
        <span class="hover:no-underline">Edit on GitLab</span>
      </a>
    </section>
    <AdjacentArticleLinks
      class="mt-2"
      :fullPath="fullPath"
    />
  </article>
</template>

<script>
import { computed, watch } from '@vue/composition-api'
import useRouter from '~/assets/js/useRouter'

import { SimpleGitLab } from '@baleada/icons/vue'

import AdjacentArticleLinks from '~/components/AdjacentArticleLinks.vue'

export default {
  name: 'NiftyArticle',
  components: {
    SimpleGitLab,
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
    },
    repoLink: {
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
