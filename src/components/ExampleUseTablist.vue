<template>
  <section
    :ref="tablist.root.ref"
    aria-label="Example tablist"
    class="mx-auto with-max-w flex flex-col gap-8 p-6 rounded-4 shadow-4"
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
    <section class="flex flex-col gap-4">
      <section class="flex flex-col gap-2">
        <label>Focused:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ tablist.focused.location }}</code></pre>
      </section>
      <section class="flex flex-col gap-2">
        <label>Selected:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ tablist.selected.newest }}</code></pre>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { ref, readonly, defineComponent } from 'vue'
import { defineTransition, useTablist } from '@baleada/vue-features'
import { useStore } from '../composition'
// import type { Organization } from '@alexvipond/mulago-foundation-portfolio'

const totalTabs = 3

export default defineComponent({
  name: 'ExampleUseTablist',
  setup () {
    // const mulagoFoundationPortfolio = useFetchable('https://raw.githubusercontent.com/AlexVipond/mulago-foundation-portfolio/main/src/portfolio.json')
    // const organizations = ref<Organization[]>([])

    // onMounted(async () => {
    //   await mulagoFoundationPortfolio.value.get()
    //   const json = await mulagoFoundationPortfolio.value.json

    //   organizations.value = new Array(totalTabs).fill(0).map(() => json.value[Math.floor(Math.random() * json.value.length)])
    // })

    const organizations = ref([
      {
        "name": "Komaza",
        "why": [
          "Africa faces a daunting wood supply crisis. With booming populations and accelerating economies, most regions consume much more wood than they grow. Wood prices are climbing and surging deforestation is an environmental tragedy. Komaza helps people living on arid, degraded land make a living growing trees. They work across the forestry value chain, from seedlings to sawmills. At harvest, farmers get paid for their trees and Komaza earns revenue from processing and selling timber products. Komaza aims to become Africa's largest forestry company, able to produce an enormous, environmentally friendly wood supply while generating life-changing income for millions of farmers."
        ]
      },
      {
        "name": "Healthy Learners",
        "why": [
          "The health needs of school age children are still largely unmet across Africa. Healthy Learners tries to meet that need by turning school teachers into front-line health workers for low income kids. Preventable and treatable illnesses not only cause misery, they also have a direct effect on school attendance and mental development. Healthy Learners has a simple and effective solution with the potential to scale up via the Ministry of Education."
        ]
      },
      {
        "name": "EarthEnable",
        "why": [
          "Nearly 80% of Rwandans, and millions of other Africans, live in houses with dirt floors. It's a major cause of infectious disease, especially in kids. Concrete flooring is prohibitively expensive, even for a tiny home. EarthEnable sell and install a sealed earthen floor that is healthy, affordable, and environmentally sustainable. With their proprietary locally-sourced sealant, EarthEnable sells hard floors that are 70% cheaper than concrete. Their product improves health with a proven, affordable, and green solution."
        ]
      },
    ])

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
