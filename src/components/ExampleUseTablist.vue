<template>
  <section
    :ref="tablist.root.ref"
    aria-label="Example tablist"
    class="mx-auto with-max-w flex flex-col gap-2 p-6 rounded-4 shadow-4"
    :class="[
      store.statuses.darkTheme === 'enabled'
        ? 'bg-primary-gray-80'
        : 'bg-primary-20'
    ]"
  >
    <div class="-ml-2 flex gap-2 p-2 overflow-x-scroll">
      <div
        v-for="({ name }, index) in organizations"
        :key="name"
        :ref="tablist.tabs.getRef(index)"
        class="relative btn-grows btn-raised flex-shrink-0"
      >
        <div
          class="btn"
          :class="[
            tablist.is.selected(index)
              ? store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-60' || 'bg-white'
              : store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-primary-10'
          ]"
        >
          {{ name }}
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="w-full p-6 opacity-0" aria-hidden="true"><div class="h-13 w-full"></div></div>
      <div
        v-for="({ name, why }, index) in organizations"
        :key="name"
        :ref="tablist.panels.getRef(index)"
        class="absolute top-0 left-0 h-full w-full p-6 overflow-y-scroll rounded-4 shadow-4"
        :class="[
          store.statuses.darkTheme === 'enabled'
            ? 'bg-primary-gray-70'
            : 'bg-white'
        ]"
      >
        <p v-for="p in why">{{ p }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, watch, reactive, nextTick, onMounted } from 'vue'
import { useTablist } from '@baleada/vue-features'
import { useAnimateable, useDelayable, useFetchable } from '@baleada/vue-composition'
import { useStore } from '../composition'
import { verouEaseOut } from '@baleada/animateable-utils'
import type { Organization } from '@alexvipond/mulago-foundation-portfolio'

type TransitionMetadatum = {
  fadeIn: ReturnType<typeof useAnimateable>,
  fadeOut: ReturnType<typeof useAnimateable>,
  delayable: ReturnType<typeof useDelayable>,
  stopWatchingStatus: {
    [animation in 'fadeOut' | 'fadeIn']?: ReturnType<typeof watch>
  }
}

const totalTabs = 3

export default {
  name: 'ExampleUseTablist',
  setup () {
    const mulagoFoundationPortfolio = useFetchable('https://raw.githubusercontent.com/AlexVipond/mulago-foundation-portfolio/main/src/portfolio.json')
    const organizations = ref<Organization[]>([])

    onMounted(async () => {
      await mulagoFoundationPortfolio.value.get()
      const json = await mulagoFoundationPortfolio.value.json

      organizations.value = new Array(totalTabs).fill(0).map(() => json.value[Math.floor(Math.random() * json.value.length)])
    })

    const fadeOutCreate = () => useAnimateable(
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
          transitionMetadata: TransitionMetadatum[] = new Array(totalTabs).fill(0).map(() => ({
            fadeIn: fadeInCreate(),
            fadeOut: fadeOutCreate(),
            delayable: delayableCreate(),
            stopWatchingStatus: {},
          })),
          tablist = reactive(useTablist({
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
      organizations,
      tablist,
      store: useStore(),
    }
  }
}
</script>
