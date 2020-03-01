<template lang="html">
  <ProseLayout :fullPathInjectKey="fullPathInjectKey" :defaultPropsInjectKey="defaultPropsInjectKey">
    <ThreeColumn />
  </ProseLayout>
</template>

<script>
import { computed, provide } from '@vue/composition-api'

import useRouter from '~/assets/js/useRouter.js'

import ThreeColumn from '~/components/ThreeColumn'

export default {
  components: {
    ThreeColumn
  },
  setup () {
    const { route } = useRouter(),
          fullPathInjectKey = Symbol('fullPath'),
          fullPath = computed(() => route.value.fullPath)

    provide(fullPathInjectKey, fullPath)

    const defaultPropsInjectKey = Symbol('defaultProps'),
          defaultProps = {
            blockquote: {
              canTweet: true,
              tweetVia: '@BaleadaToolkit',
            },
            codeblock: {
              canCopy: true,
            },
            heading: {
              classes: '',
              canCopy: true,
            },
          }

    provide(defaultPropsInjectKey, defaultProps)

    return {
      fullPathInjectKey,
      defaultPropsInjectKey
    }
  },
}
</script>

<style lang="postcss">

</style>
