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
      <p :ref="description.ref()">This textbox has two-way binding for both value and selection.</p>
      <input
        :ref="textbox.root.ref({ describedBy: description.id })"
        type="text"
        placeholder="Type something..."
        aria-label="Example textbox"
        class="form -shadow-4"
        :class="[
          store.statuses.darkTheme === 'enabled'
            ? 'bg-primary-gray-90 ring-primary-gray-80 focus:ring-primary-gray-40'
            : 'bg-white ring-primary-20 focus:ring-primary-70'
      
        ]"
      />
      <section class="flex gap-2">
        <button
          class="btn btn-grows btn-raised"
          :class="[
            store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
          ]"
          aria-label="Undo"
          @click="() => textbox.undo()"
        >
          Undo
        </button>
        <button
          class="btn btn-grows btn-raised"
          :class="[
            store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
          ]"
          aria-label="Redo"
          @click="() => textbox.redo()"
        >
          Redo
        </button>
      </section>
    </section>
    <section class="flex flex-col gap-4">
      <section class="flex flex-col gap-2">
        <label>Value:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ textbox.text.string || '\'\'' }}</code></pre>
      </section>
      <section class="flex flex-col gap-2">
        <label>Selection:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ selectionJson }}</code></pre>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { readonly, computed } from 'vue'
import { useTextbox, useElementApi } from '@baleada/vue-features'
import { useStore } from '../composition'

export default {
  name: 'ExampleUseTextbox',
  setup () {
    const textbox = useTextbox(),
          description = useElementApi({ identifies: true }),
          selectionJson = computed(() => JSON.stringify(textbox.text.selection, null, 2))

    return {
      textbox: readonly(textbox),
      description: readonly(description),
      selectionJson,
      store: useStore(),
    }
  }
}
</script>
