<template>
  <section
    class="mx-auto with-max-w flex flex-col items-center p-6 rounded-4 shadow-4"
    :class="[
      store.statuses.darkTheme === 'enabled'
        ? 'bg-primary-gray-80'
        : 'bg-primary-20'
    ]"
  >
    <button
      @click="toggle"
      class="btn btn-grows btn-raised"
      :class="[
        store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
      ]"
    >
      Toggle display
    </button>
    <div
      role="img"
      ref="el"
      class="with-mt h-12 w-12 origin-center transition-none"
    >
      <BrandLogo />
    </div>
  </section>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import { show } from '@baleada/vue-features'
import { useStore } from '../composition'
import { useAnimateable } from '@baleada/vue-composition'
import { verouEase } from '@baleada/logic'

export default {
  name: 'ExampleShow',
  setup () {
    const el = ref(null),
          isDisplayed = ref(false),
          toggle = () => (isDisplayed.value = !isDisplayed.value),
          appear = useAnimateable(
            [
              // Grow a bit
              { progress: 0, properties: { scale: 0 }, timing: verouEase },
              { progress: .2, properties: { scale: 1 } },

              // Weeee
              { progress: .35, properties: { rotate: 0 }, timing: verouEase },
              { progress: .75, properties: { rotate: 360 } },

              // Shrink back
              { progress: .85, properties: { scale: 1.1 }, timing: verouEase },
              { progress: 1, properties: { scale: 1 } },
            ],
            { duration: 2000, timing: verouEase }
          ),
          grow = useAnimateable(
            [
              { progress: 0, properties: { scale: 0 } },
              { progress: 1, properties: { scale: 1 } },
            ],
            { duration: 250, timing: verouEase },
          ),
          shrink = useAnimateable(
            [
              { progress: 0, properties: { scale: 1 } },
              { progress: 1, properties: { scale: 0 } },
            ],
            { duration: 250, timing: verouEase },
          ),
          stopWatchingStatus: {
            [animation in 'appear' | 'grow' | 'shrink']?: ReturnType<typeof watch>
          } = {}

    show(
      el,
      isDisplayed,
      {
        transition: {
          appear: {
            active ({ element, done }) {
              stopWatchingStatus.appear = watch(
                [() => appear.value.status],
                () => {
                  if (appear.value.status === 'played') {
                    stopWatchingStatus.appear()
                    done()
                  }
                },
              )

              appear.value.play(({ properties: { scale, rotate } }) => {
                element.style.transform = `scale(${scale.interpolated}) rotate(${rotate.interpolated}deg)`
              })
            },
            cancel ({ element }) {
              stopWatchingStatus.appear()
              appear.value.stop()
              element.style.transform = `rotate(0deg)`
            },
          },
          enter: {
            active ({ element, done }) {
              stopWatchingStatus.grow = watch(
                [() => grow.value.status],
                () => {
                  if (grow.value.status === 'played') {
                    stopWatchingStatus.grow()
                    done()
                  }
                },
              )

              grow.value.play(({ properties: { scale } }) => (element.style.transform = `scale(${scale.interpolated})`))
            },
            cancel ({ element }) {
              stopWatchingStatus.grow()
              grow.value.stop()
              element.style.transform = 'scale(0)'
            },
          },
          leave: {
            active ({ element, done }) {
              stopWatchingStatus.shrink = watch(
                [() => shrink.value.status],
                () => {
                  if (shrink.value.status === 'played') {
                    stopWatchingStatus.shrink()
                    done()
                  }
                },
              )

              shrink.value.play(({ properties: { scale } }) => (element.style.transform = `scale(${scale.interpolated})`))
            },
            cancel ({ element }) {
              stopWatchingStatus.shrink()
              shrink.value.stop()
              element.style.transform = 'scale(1)'
            },
          },
        }
      }
    )

    return {
      el,
      isDisplayed,
      toggle,
      store: useStore(),
    }
  }
}
</script>
