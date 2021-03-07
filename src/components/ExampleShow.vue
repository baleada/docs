<template>
  <section
    class="mx-auto with-max-w flex flex-col items-center p-6 rounded-4 shadow-4"
    :class="[
      context.statuses.darkTheme === 'enabled'
        ? 'bg-primary-gray-80'
        : 'bg-primary-20'
    ]"
  >
    <button
      @click="toggle"
      class="btn btn-grows btn-raised"
      :class="[
        context.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
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

<script>
import { ref, watch } from 'vue'
import { show } from '@baleada/vue-features/affordances'
import { useContext } from '@functions'
import { useAnimateable } from '@baleada/vue-composition'
import { verouEase } from '@baleada/animateable-utils'

export default {
  name: 'ExampleShow',
  setup () {
    const el = ref(null),
          isDisplayed = ref(false),
          toggle = () => (isDisplayed.value = !isDisplayed.value),
          appear = useAnimateable(
            [
              // Grow a bit
              { progress: 0, data: { scale: 0 }, timing: verouEase },
              { progress: .2, data: { scale: 1 } },

              // Weeee
              { progress: .35, data: { rotate: 0 }, timing: verouEase },
              { progress: .75, data: { rotate: 360 } },

              // Shrink back
              { progress: .85, data: { scale: 1.1 }, timing: verouEase },
              { progress: 1, data: { scale: 1 } },
            ],
            { duration: 2000, timing: verouEase }
          ),
          grow = useAnimateable(
            [
              { progress: 0, data: { scale: 0 } },
              { progress: 1, data: { scale: 1 } },
            ],
            { duration: 250, timing: verouEase },
          ),
          shrink = useAnimateable(
            [
              { progress: 0, data: { scale: 1 } },
              { progress: 1, data: { scale: 0 } },
            ],
            { duration: 250, timing: verouEase },
          ),
          stopWatchingStatus = {}

    show(
      {
        target: el,
        condition: isDisplayed,
      },
      {
        transition: {
          appear: {
            active ({ target, done }) {
              stopWatchingStatus.appear = watch(
                [() => appear.value.status],
                () => {
                  if (appear.value.status === 'played') {
                    stopWatchingStatus.appear()
                    done()
                  }
                },
              )

              appear.value.play(({ data: { scale, rotate } }) => {
                target.style.transform = `scale(${scale}) rotate(${rotate}deg)`
              })
            },
            cancel ({ target }) {
              stopWatchingStatus.appear()
              appear.value.stop()
              target.style.transform = `rotate(${rotate}deg)`
            },
          },
          enter: {
            active ({ target, done }) {
              stopWatchingStatus.grow = watch(
                [() => grow.value.status],
                () => {
                  if (grow.value.status === 'played') {
                    stopWatchingStatus.grow()
                    done()
                  }
                },
              )

              grow.value.play(({ data: { scale } }) => (target.style.transform = `scale(${scale})`))
            },
            cancel ({ target }) {
              stopWatchingStatus.grow()
              grow.value.stop()
              target.style.transform = 'scale(0)'
            },
          },
          leave: {
            active ({ target, done }) {
              stopWatchingStatus.shrink = watch(
                [() => shrink.value.status],
                () => {
                  if (shrink.value.status === 'played') {
                    stopWatchingStatus.shrink()
                    done()
                  }
                },
              )

              shrink.value.play(({ data: { scale } }) => (target.style.transform = `scale(${scale})`))
            },
            cancel ({ target }) {
              stopWatchingStatus.shrink()
              shrink.value.stop()
              target.style.transform = 'scale(1)'
            },
          },
        }
      }
    )

    return {
      el,
      isDisplayed,
      toggle,
      context: useContext(),
    }
  }
}
</script>
