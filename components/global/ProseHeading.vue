<template lang="html">
  <component
    class="prose-heading relative transition cursor-pointer"
    :is="`h${level}`"
    @mouseover="handleMouseover"
    @mouseleave="handleMouseleave"
  >
    <!-- TODO: make this a button that copies the link -->
    <a
      :href="`#${slug}`"
      :class="[
        'hidden md:inline-flex items-center absolute left-0 h-5 w-5 transition',
        Number(level) === 1 ? 'top-1' : 'top-1/2',
        buttonIsShown ? '' : 'opacity-0 pointer-events-none'
      ]"
      :style="{
        transform: `translateX(-150%)${Number(level) === 1 ? '' : ' translateY(-50%)'}`
      }"
    >
      <EvaLink :class="'icon text-inherit'" />
    </a>
    <a
      ref="prose"
      :id="slug"
      :href="`#${slug}`"
    >
      <slot />
    </a>
  </component>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api'

import simpleSlugify from '~/assets/js/simpleSlugify'

import { EvaLink } from '@baleada/icons/vue'

export default {
  name: 'ProseHeading',
  components: {
    EvaLink
  },
  props: {
    level: {
      type: [Number, String],
      required: true,
    }
  },
  setup() {
    const prose = ref(null),
          slug = computed(() => prose.value ? simpleSlugify(prose.value.textContent).toLowerCase() : ''),
          buttonIsShown = ref(false),
          handleMouseover = () => (buttonIsShown.value = true),
          handleMouseleave = () => (buttonIsShown.value = false)

    return {
      prose,
      slug,
      buttonIsShown,
      handleMouseover,
      handleMouseleave,
    }
  },
}
</script>
