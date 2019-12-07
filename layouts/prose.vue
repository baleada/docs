<template lang="html">
  <ProseLayout v-bind="{ fullPathInjectKey }">
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
  setup() {
    const { route } = useRouter(),
          fullPath = computed(() => route.value.fullPath),
          fullPathInjectKey = Symbol('fullPath')

    provide(fullPathInjectKey, fullPath)

    return {
      fullPathInjectKey
    }
  },
}
</script>

<style lang="postcss">

</style>
