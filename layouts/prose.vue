<template lang="html">
  <ProseLayout v-bind="{ fullPathInjectKey, defaultPropsInjectKey }">
    <ThreeColumn ref="threeColumn"/>
  </ProseLayout>
</template>

<script>
import { ref, computed, provide, onMounted } from '@vue/composition-api'

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

    const threeColumn = ref(null),
          defaultPropsInjectKey = Symbol('defaultProps'),
          defaultProps = {
            article: {
              scrollableContainerGetter: () => threeColumn.value === null ? document : threeColumn.value.$refs.article
            },
            blockquote: {
              canTweet: true,
              tweetVia: 'BaleadaToolkit',
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
      threeColumn,
      fullPathInjectKey,
      defaultPropsInjectKey
    }
  },
}
</script>

<style lang="postcss">

</style>
