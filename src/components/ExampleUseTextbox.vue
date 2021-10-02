<template>
  <section
    class="mx-auto with-max-w flex flex-col gap-7 p-6 rounded-4 shadow-4"
    :class="[
      store.statuses.darkTheme === 'enabled'
        ? 'bg-primary-gray-80'
        : 'bg-primary-20 text-primary-100'
    ]"
  >
    <input
      :ref="textbox.root.ref"
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
        @click="() => textbox.undo()"
      >
        Undo
      </button>
      <button
        class="btn btn-grows btn-raised"
        :class="[
          store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
        ]"
        @click="() => textbox.redo()"
      >
        Redo
      </button>
    </section>
  </section>
</template>

<script lang="ts">
import { readonly } from 'vue'
import { useTextbox } from '@baleada/vue-features'
import { useStore } from '../composition'

export default {
  name: 'ExampleUseTextbox',
  setup () {
    const textbox = readonly(useTextbox())

    return {
      textbox,
      store: useStore(),
    }
  }
}
</script>
