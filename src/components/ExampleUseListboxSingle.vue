<template>
  <section
    class="
      mx-auto with-max-w flex flex-col gap-8 p-6 rounded-4 shadow-4
      bg-primary-20 dork:bg-primary-gray-80
    "
  >
    <div
      :ref="listbox.root.ref()"
      aria-label="Example listbox"
      class="
        h-24 flex flex-col overflow-x-scroll shadow-5
        bg-white dork:bg-primary-gray-90
      "
    >
      <div
        v-for="(name, index) in organizations"
        :key="name"
        :ref="listbox.options.ref(index)"
        class="p-2 focus:outline-none"
        :class="{
          'bg-primary-10 text-primary-90 dork:bg-primary-gray-70': listbox.is.focused(index) && !listbox.is.selected(index),
          'bg-primary-50 text-primary-10 dork:bg-primary-50': listbox.is.selected(index),
        }"
      >
        {{ name }}
      </div>
    </div>
    <section class="flex flex-col gap-4">
      <section class="flex flex-col gap-2">
        <label>Focused:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ listbox.focused }}</code></pre>
      </section>
      <section class="flex flex-col gap-2">
        <label>Selected:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ listbox.selected[0] }}</code></pre>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { ref, readonly } from 'vue'
import { useListbox } from '@baleada/vue-features'
// import { useFetchable } from '@baleada/vue-composition'
import { names } from '@alexvipond/mulago'
// import type { Organization } from '@alexvipond/mulago'

export default {
  name: 'ExampleUseListboxSingle',
  setup () {
    const organizations = ref(names.slice(0, Math.floor(names.length / 2)))

    const listbox = readonly(useListbox())
          
    return {
      organizations,
      listbox,
    }
  }
}
</script>
