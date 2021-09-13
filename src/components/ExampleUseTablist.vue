<template>
  <section
    :ref="tablist.root.ref"
    class="mx-auto with-max-w flex flex-col gap-2 p-6 rounded-4 shadow-4"
    :class="[
      store.statuses.darkTheme === 'enabled'
        ? 'bg-primary-gray-80'
        : 'bg-primary-20'
    ]"
  >
    <div class="flex gap-2">
      <div
        v-for="({ tab }, index) in metadata"
        :key="tab"
        :ref="tablist.tabs.getRef(index)"
        class="relative btn-grows btn-raised"
      >
        <div
          class="btn"
          :class="[
            tablist.isSelected.tab(index)
              ? store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-60' || 'bg-white'
              : store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-primary-10'
          ]"
        >
          {{ tab }}
        </div>
      </div>
    </div>
    <div class="relative">
      <div
        v-for="({ tab, panel }, index) in metadata"
        :key="tab"
        :ref="tablist.panels.getRef(index)"
        class="absolute top-0 left-0 w-full p-6 rounded-4 shadow-4"
        :class="[
          store.statuses.darkTheme === 'enabled'
            ? 'bg-primary-gray-70'
            : 'bg-white'
        ]"
      >
        <span>{{ panel }}</span>
      </div>
      <div class="w-full p-6 opacity-0" aria-hidden="true"><div class="h-[1em] w-full"></div></div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, watch, reactive, nextTick } from 'vue'
import { useTablist } from '@baleada/vue-features'
import { useAnimateable, useDelayable } from '@baleada/vue-composition'
import { useStore } from '../composition'
import { verouEaseOut } from '@baleada/animateable-utils'

type TransitionMetadatum = {
  fadeIn: ReturnType<typeof useAnimateable>,
  fadeOut: ReturnType<typeof useAnimateable>,
  delayable: ReturnType<typeof useDelayable>,
  stopWatchingStatus: {
    [animation in 'fadeOut' | 'fadeIn']?: ReturnType<typeof watch>
  }
}

export default {
  name: 'ExampleUseTablist',
  setup () {
    const metadata = ref([
            { tab: 'Baleada', panel: '🌮' },
            { tab: 'Toolkit', panel: '🛠' },
            { tab: 'Poop', panel: '💩' },
          ]),
          fadeOutCreate = () => useAnimateable(
            [
              { progress: 0, properties: { opacity: 1 } },
              { progress: 1, properties: { opacity: 0 } },
            ],
            { duration: 75, timing: verouEaseOut }
          ),
          fadeInCreate = () => useAnimateable(
            [
              { progress: 0, properties: { opacity: 0 } },
              { progress: 1, properties: { opacity: 1 } },
            ],
            { duration: 100, timing: verouEaseOut }
          ),
          delayableCreate = () => useDelayable(() => {}, { delay: 130 }),
          transitionMetadata: TransitionMetadatum[] = metadata.value.map(() => ({
            fadeIn: fadeInCreate(),
            fadeOut: fadeOutCreate(),
            delayable: delayableCreate(),
            stopWatchingStatus: {},
          })),
          tablist = reactive(useTablist({
            label: 'Example tablist',
            transition: {
              panel: {
                appear: true,
                enter: {
                  active: ({ element, index, done }) => {
                    transitionMetadata[index].stopWatchingStatus.fadeIn = watch(
                      [() => transitionMetadata[index].fadeIn.value.status],
                      () => {
                        if (transitionMetadata[index].fadeIn.value.status === 'played') {
                          transitionMetadata[index].stopWatchingStatus.fadeIn()
                          done()
                        }
                      },
                    )

                    transitionMetadata[index].delayable.value.effect = () => {
                      nextTick(() => transitionMetadata[index].fadeIn.value.play(({ properties: { opacity: { interpolated: opacity } } }) => (element.style.opacity = `${opacity}`)))
                    }
                    transitionMetadata[index].delayable.value.delay()
                  },
                  cancel: ({ element, index }) => {
                    transitionMetadata[index].delayable.value.stop()
                    transitionMetadata[index].stopWatchingStatus.fadeIn()
                    transitionMetadata[index].fadeIn.value.stop()
                    element.style.opacity = '0'
                  }
                },
                leave: {
                  active: ({ element, index, done }) => {
                    transitionMetadata[index].stopWatchingStatus.fadeOut = watch(
                      [() => transitionMetadata[index].fadeOut.value.status],
                      () => {
                        if (transitionMetadata[index].fadeOut.value.status === 'played') {
                          transitionMetadata[index].stopWatchingStatus.fadeOut()
                          done()
                        }
                      },
                    )
        
                    transitionMetadata[index].fadeOut.value.play(({ properties: { opacity: { interpolated: opacity } } }) => (element.style.opacity = `${opacity}`))
                  },
                  cancel: ({ element, index }) => {
                    transitionMetadata[index].stopWatchingStatus.fadeOut()
                    transitionMetadata[index].fadeOut.value.stop()
                    element.style.opacity = '1'
                  },
                },
              }
            }
          }))
          
    return {
      metadata,
      tablist,
      store: useStore(),
    }
  }
}
</script>
