<template lang="html">
  <section class="nifty-table">
    <input v-if="isTypeToFilterable" type="text" @change="handleFilterQuery" />
    <div
      ref="nifty"
      class="scrollable p-2px"
      :class="[
        hasMaxH ? 'max-h-2/3-screen' : ''
      ]"
      tabindex="0"
      :aria-label="ariaLabel"
      @keydown="handleKeydown"
    >
      <slot />
    </div>
  </section>
</template>

<script>
import useNifty from '~/assets/js/useNifty'
import { toGrid } from '~/assets/js/postRender'
import { useGrid } from '~/assets/js/keyboardAccessibility'

export default {
  props: {
    hasMaxH: {
      type: Boolean,
      default: false,
    },
    isTypeToFilterable: {
      type: Boolean,
      default: false,
    },
    ariaLabel: {
      type: String,
      required: true,
    }
  },
  setup() {
    const nifty = useNifty({ postRender: toGrid })

    function handleFilterQuery ({ target: { value } }) {
      // filter based on value
    }

    const handleKeydown = useGrid(() => nifty.value)

    return {
      nifty,
      handleFilterQuery,
      handleKeydown,
    }
  },
}
</script>
