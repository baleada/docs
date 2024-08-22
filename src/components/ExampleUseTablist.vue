<template>
  <section
    :ref="tablist.root.ref()"
    aria-label="Example tablist"
    class="
      mx-auto with-max-w flex flex-col gap-8 p-6 rounded-4 shadow-4
      bg-primary-20 dork:bg-primary-gray-80
    "
  >
    <div class="-ml-2 flex gap-2 p-2 overflow-x-scroll">
      <div
        v-for="({ name }, index) in organizations"
        :key="name"
        :ref="tablist.tabs.ref(index)"
        class="relative btn-grows btn-raised flex-shrink-0"
      >
        <div
          class="btn"
          :class="[
            tablist.is.selected(index)
              ? 'bg-white dork:bg-primary-gray-60'
              : 'bg-primary-10 dork:bg-primary-gray-70'
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
        :ref="tablist.panels.ref(index)"
        class="
          absolute top-0 left-0 h-full w-full p-6 overflow-y-scroll rounded-4 shadow-4
          bg-white dork:bg-primary-gray-70
        "
      >
        <p v-for="p in why">{{ p }}</p>
      </div>
    </div>
    <section class="flex flex-col gap-4">
      <section class="flex flex-col gap-2">
        <label>Focused:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ tablist.focused }}</code></pre>
      </section>
      <section class="flex flex-col gap-2">
        <label>Selected:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ tablist.selected[0] }}</code></pre>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { ref, readonly, onMounted, nextTick, defineComponent } from 'vue'
import { defineTransition, useTablist } from '@baleada/vue-features'
import { useFetchable } from '@baleada/vue-composition'
import { useStore } from '../composition'
import type { Organization } from '@alexvipond/mulago'

const totalTabs = 3

export default defineComponent({
  name: 'ExampleUseTablist',
  setup () {
    const mulagoFoundationPortfolio = useFetchable('https://raw.githubusercontent.com/AlexVipond/mulago/main/src/portfolio.json')
    const organizations = ref<Organization[]>([])

    onMounted(() => {
      (async () => {
        await mulagoFoundationPortfolio.get()
        const json = await mulagoFoundationPortfolio.json.resolve()

        organizations.value = new Array(totalTabs).fill(0).map(() => json.value[Math.floor(Math.random() * json.value.length)])

        nextTick(() => tablist.select.exact(0))
      })()
    })

    const tablist = readonly(useTablist({
            transition: {
              panel: elements => ({
                appear: true,
                enter: defineTransition<typeof elements, 'css'>({
                  from: 'opacity-0',
                  active: 'transition ease-out duration-5',
                  to: 'opacity-100',
                }),
                leave: defineTransition<typeof elements, 'css'>({
                  from: 'opacity-100',
                  active: 'transition ease-in duration-5',
                  to: 'opacity-0',
                }),
              })
            }
          }))
          
    return {
      organizations,
      tablist,
      store: useStore(),
    }
  }
})
</script>
