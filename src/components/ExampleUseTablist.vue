<template>
  <section
    :ref="tablist.root()"
    class="mx-auto with-max-w flex flex-col gap-2 p-6 rounded-4 shadow-4"
    :class="[
      context.statuses.darkTheme === 'enabled'
        ? 'bg-primary-gray-80'
        : 'bg-primary-20'
    ]"
  >
    <div class="flex gap-2">
      <div
        v-for="({ tab }, index) in metadata"
        :key="tab"
        :ref="tablist.tabs(index)"
        class="relative btn-grows btn-raised"
      >
        <div
          class="btn"
          :class="[
            index === tablist.selected.tab
              ? context.statuses.darkTheme === 'enabled' && 'bg-primary-gray-60' || 'bg-white'
              : context.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-primary-10'
          ]"
        >
          {{ tab }}
        </div>
        <OcticonsTriangleDown24
          v-show="index === tablist.selected.tab"
          class="absolute h-6 w-6 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3.5 fill-current transition"
          :class="[
            index === tablist.selected.tab
              ? context.statuses.darkTheme === 'enabled' && 'text-primary-gray-60' || 'text-white'
              : context.statuses.darkTheme === 'enabled' && 'text-primary-gray-70' || 'text-primary-10'
          ]"
        />
      </div>
    </div>
    <div class="relative">
      <div
        v-for="({ tab, panel }, index) in metadata"
        :key="tab"
        :ref="tablist.panels(index)"
        class="absolute top-0 left-0 w-full p-6 rounded-4 shadow-4"
        :class="[
          context.statuses.darkTheme === 'enabled'
            ? 'bg-primary-gray-70'
            : 'bg-white'
        ]"
      >
        <span>{{ panel }}</span>
      </div>
      <div class="w-full p-6 opacity-0" aria-hidden="true"><div class="h-em-1 w-full"></div></div>
    </div>
  </section>
</template>

<script>
import { ref, shallowRef, computed, watch, readonly, nextTick } from 'vue'
import { useTablist } from '@baleada/vue-features'
import { useAnimateable, useDelayable } from '@baleada/vue-composition'
import { OcticonsTriangleDown24 } from '@baleada/vue-octicons'
import { useContext } from '@functions'
import { verouEaseOut } from '@baleada/animateable-utils'

export default {
  name: 'ExampleUseTablist',
  components: {
    OcticonsTriangleDown24,
  },
  setup () {
    const metadata = ref([
            { tab: 'Baleada', panel: '🌮' },
            { tab: 'Toolkit', panel: '🛠' },
            { tab: 'Yay', panel: '🎉' },
          ]),
          fadeOutCreate = () => useAnimateable(
            [
              { progress: 0, data: { opacity: 1 } },
              { progress: 1, data: { opacity: 0 } },
            ],
            { duration: 75, timing: verouEaseOut }
          ),
          fadeInCreate = () => useAnimateable(
            [
              { progress: 0, data: { opacity: 0 } },
              { progress: 1, data: { opacity: 1 } },
            ],
            { duration: 100, timing: verouEaseOut }
          ),
          delayableCreate = () => useDelayable(() => {}, { delay: 130 }),
          transitionMetadata = metadata.value.map(() => ({
            fadeIn: fadeInCreate(),
            fadeOut: fadeOutCreate(),
            delayable: delayableCreate(),
            stopWatchingStatus: {},
          })),
          tablist = readonly(useTablist(
            { totalTabs: computed(() => metadata.value.length), orientation: 'horizontal' },
            {
              label: 'Example tablist',
              transition: {
                panel: {
                  appear: true,
                  enter: {
                    active: ({ target, index, done }) => {
                      transitionMetadata[index].stopWatchingStatus.fadeIn = watch(
                        [() => transitionMetadata[index].fadeIn.value.status],
                        () => {
                          if (transitionMetadata[index].fadeIn.value.status === 'played') {
                            transitionMetadata[index].stopWatchingStatus.fadeIn()
                            done()
                          }
                        },
                      )

                      transitionMetadata[index].delayable.value.callback = () => {
                        nextTick(() => transitionMetadata[index].fadeIn.value.play(({ data: { opacity } }) => (target.style.opacity = opacity)))
                      }
                      transitionMetadata[index].delayable.value.delay()
                    },
                    cancel: ({ target, index }) => {
                      transitionMetadata[index].delayable.value.stop()
                      transitionMetadata[index].stopWatchingStatus.fadeIn()
                      transitionMetadata[index].fadeIn.value.stop()
                      target.style.opacity = 0
                    }
                  },
                  leave: {
                    active: ({ target, index, done }) => {
                      transitionMetadata[index].stopWatchingStatus.fadeOut = watch(
                        [() => transitionMetadata[index].fadeOut.value.status],
                        () => {
                          if (transitionMetadata[index].fadeOut.value.status === 'played') {
                            transitionMetadata[index].stopWatchingStatus.fadeOut()
                            done()
                          }
                        },
                      )
          
                      transitionMetadata[index].fadeOut.value.play(({ data: { opacity } }) => (target.style.opacity = opacity))
                    },
                    cancel: ({ target, index }) => {
                      transitionMetadata[index].stopWatchingStatus.fadeOut()
                      transitionMetadata[index].fadeOut.value.stop()
                      target.style.opacity = 1
                    },
                  },
                }
              }
            }
          ))
          
    return {
      metadata,
      tablist,
      context: useContext(),
    }
  }
}
</script>
