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
      <label
        :ref="label.ref()"
        :htmlFor="textbox.root.id"
      >Example textbox (this is the accessible label)</label>
      <input
        :ref="textbox.root.ref({ labelledBy: label.id })"
        type="text"
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
        <label>Label ID:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ label.id }}</code></pre>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { readonly, computed } from 'vue'
import { useTextbox, useElementApi } from '@baleada/vue-features'
import { useStore } from '../composition'

export default {
  name: 'ExampleUseLabel',
  setup () {
    const textbox = useTextbox(),
          label = useElementApi({ identifies: true}),
          selectionJson = computed(() => JSON.stringify(textbox.text.selection, null, 2))

    return {
      textbox: readonly(textbox),
      label: readonly(label),
      selectionJson,
      store: useStore(),
    }
  }
}
</script>
