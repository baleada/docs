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
    <div
      v-for="({ tab, panel }, index) in metadata"
      :key="tab"
      :ref="tablist.panels(index)"
      class="p-6 rounded-4 shadow-4"
      :class="[
        context.statuses.darkTheme === 'enabled'
          ? 'bg-primary-gray-60'
          : 'bg-white'
      ]"
    >
      <span>{{ panel }}</span>
    </div>
  </section>
</template>

<script>
import { ref, computed, readonly } from 'vue'
import { useTablist } from '@baleada/vue-features'
import { OcticonsTriangleDown24 } from '@baleada/vue-octicons'
import { useContext } from '@functions'

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
          tablist = readonly(useTablist(
            { totalTabs: computed(() => metadata.value.length), orientation: 'horizontal' },
            { label: 'Example tablist' }
          ))
          
    return {
      metadata,
      tablist,
      context: useContext(),
    }
  }
}
</script>
