<template>
  <div class="overflow-x-hidden">
    <RectangleGradient
      :class="'absolute pin-t pin-l z-10 w-screen h-screen'"
      gradient-id="landing-page"
      :x="{ 1: 0, 2: 1 }"
      :y="{ 1: 0, 2: 1 }"
      :stops="[
        { offset: 0, classes: 'text-primary-400' },
        { offset: 40, classes: 'text-primary-600' },
        { offset: 95, classes: 'text-primary-700' },
      ]"
    />
    <nuxt class="relative z-20"/>

    <PageFooter />
  </div>
</template>

<script>
import RectangleGradient from '~/components/RectangleGradient.vue'

import PageFooter from '~/components/PageFooter.vue'

export default {
  components: {
    PageFooter,
    RectangleGradient,
  }
}
</script>
