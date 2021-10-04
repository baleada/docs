<template>
  <section
    class="mx-auto with-max-w flex flex-col gap-7 p-6 rounded-4 shadow-4"
    :class="[
      store.statuses.darkTheme === 'enabled'
        ? 'bg-primary-gray-80'
        : 'bg-primary-20 text-primary-100'
    ]"
  >
    <section class="flex flex-col gap-2">
      <p :ref="details.root.ref">Example textbox (this is the accessible details)</p>
      <input
        :ref="textbox.root.ref"
        type="text"
        aria-label="Example textbox"
        placeholder="Type something..."
        class="form -shadow-4"
        :class="[
          store.statuses.darkTheme === 'enabled'
            ? 'bg-primary-gray-90 ring-primary-gray-80 focus:ring-primary-gray-40'
            : 'bg-white ring-primary-20 focus:ring-primary-70'
      
        ]"
      />
    </section>
    <section class="flex flex-col gap-4">
      <section class="flex flex-col gap-2">
        <label>Details ID:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ details.id }}</code></pre>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { readonly, computed } from 'vue'
import { useTextbox, useDetails } from '@baleada/vue-features'
import { useStore } from '../composition'

export default {
  name: 'ExampleUseDetails',
  setup () {
    const textbox = useTextbox(),
          details = useDetails(textbox),
          selectionJson = computed(() => JSON.stringify(textbox.completeable.value.selection, null, 2))

    return {
      textbox: readonly(textbox),
      details: readonly(details),
      selectionJson,
      store: useStore(),
    }
  }
}
</script>
