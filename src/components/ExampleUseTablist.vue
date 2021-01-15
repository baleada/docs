<template>
  <section
    :ref="tablist.root.ref()"
    class="mx-auto with-max-w flex flex-col gap-2 bg-primary-20 p-6 rounded-4 shadow-4"
  >
    <div class="flex gap-2">
      <div
        v-for="({ status }, index) in tablist.tabs.data"
        :key="metadata[index].tab"
        :ref="tablist.tabs.ref(index)"
        class="relative btn-grows btn-raised"
        
      >
        <div
          class="btn"
          :class="[
            status === 'selected' ? 'bg-white' : 'bg-primary-10'
          ]"
        >
          {{ metadata[index].tab }}
        </div>
        <OcticonsTriangleDown24
          v-show="status === 'selected'"
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-white fill-current"
        />
      </div>
    </div>
    <div
      v-for="({ status }, index) in tablist.panels.data"
      :key="metadata[index].tab"
      :ref="tablist.panels.ref(index)"
      class="p-6 bg-white rounded-4 shadow-4"
    >
      <span>{{ metadata[index].panel }}</span>
    </div>
  </section>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { useTablist } from '@baleada/vue-features'
import { OcticonsTriangleDown24 } from '@baleada/vue-octicons'

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
          tablist = reactive(useTablist(
            { totalTabs: computed(() => metadata.value.length), orientation: 'horizontal' },
            { label: 'Example tablist' }
          ))
    
    return {
      metadata,
      tablist,
    }
  }
}
</script>
