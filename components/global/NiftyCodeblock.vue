<template lang="html">
  <section
    class="relative nifty-codeblock swiper-no-swiping"
  >
    <!-- Copy button -->
    <button
      name="copy-code"
      class="absolute right-0 top-0 mt-2 mr-2 h-5 w-5 text-gray-600 btn-grows transition"
      @click="handleCopyButtonClick"
    >
      <EvaCopy :class="'icon'" />
    </button>
    <div ref="nifty">
      <slot />
    </div>
  </section>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import useCopiable from '~/assets/js/baleada/composition/useCopiable'

import { EvaCopy } from '@baleada/icons/vue'

export default {
  name: 'NiftyCodeblock',
  components: {
    EvaCopy,
  },
  setup() {
    const nifty = ref(null),
          copiable = useCopiable(''),
          code = computed(() => {
            const code = nifty.value ? nifty.value.textContent : ''
            useCopiable.setString(code)
            return code
          })

    function handleCopyButtonClick () {
      copiable.copy()
    }

    return {
      nifty,
      handleCopyButtonClick
    }
  },
}
</script>
