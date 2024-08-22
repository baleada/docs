<template>
  <section
    class="mx-auto with-max-w flex flex-col items-center gap-5 p-6 rounded-4 shadow-4"
    :class="[
      store.statuses.darkTheme === 'enabled'
        ? 'bg-primary-gray-80'
        : 'bg-primary-20'
    ]"
  >
    <section class="grid grid-cols-1 md:grid-cols-2 gap-5 items-center justify-center">
      <button
        @click="toggle"
        class="mx-auto md:mr-0 btn btn-grows btn-raised whitespace-nowrap"
        :class="[
          store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
        ]"
      >
        Toggle display
      </button>
      <pre class="px-2 py-1 m-0"><code class="mr-auto">status: '{{ status }}'</code></pre>
    </section>
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
import { show, defineTransition } from '@baleada/vue-features'
import { useStore } from '../composition'
import { useAnimateable } from '@baleada/vue-composition'
import { verouEase } from '@baleada/logic'

export default {
  name: 'ExampleShow',
  setup () {
    const el = ref<HTMLElement>(),
          isDisplayed = ref(false),
          toggle = () => (isDisplayed.value = !isDisplayed.value),
          fancyEnter = useAnimateable(
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
          status = ref<
            'idle'
            | 'appearing/entering'
            | 'appeared/entered'
            | 'cancelled appear/enter'
            | 'leaving'
            | 'left'
            | 'cancelled leave'
          >('idle')
      
    let stopWatchingStatus: ReturnType<typeof watch>

    show(
      el,
      isDisplayed,
      {
        transition: {
          // Setting `appear` to `true` to reuse `enter` transition
          appear: true,

          // JS enter transition
          enter: defineTransition<typeof el, 'js'>({
            before () {
              status.value = 'appearing/entering'
            },
            active (done) {
              stopWatchingStatus = watch(
                [() => fancyEnter.status],
                () => {
                  if (fancyEnter.status === 'played') {
                    stopWatchingStatus()
                    done()
                  }
                },
              )
              fancyEnter.play(({ properties: { scale, rotate } }) => {
                el.value.style.transform = `scale(${scale.interpolated}) rotate(${rotate.interpolated}deg)`
              })
            },
            after () {
              status.value = 'appeared/entered'
            },
            cancel () {
              stopWatchingStatus()
              fancyEnter.stop()
              el.value.style.transform = `rotate(0deg)`
              status.value = 'cancelled appear/enter'
            },
          }),

          // CSS leave transition
          leave: defineTransition<typeof el, 'css'>({
            from: 'scale-100',
            active: 'transition duration-[500ms] ease-in',
            to: 'scale-0',
            start: () => {
              status.value = 'leaving'
            },
            end: () => {
              status.value = 'left'
            },
            cancel: () => {
              status.value = 'cancelled leave'
            }
          }),
        }
      }
    )

    return {
      el,
      isDisplayed,
      status,
      toggle,
      store: useStore(),
    }
  }
}
</script>
