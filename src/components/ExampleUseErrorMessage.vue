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
      <input
        :ref="textbox.root.ref({ validity, errorMessage: errorMessage.id })"
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
      <p
        :ref="errorMessage.ref()"
        aria-live="assertive"
        v-show="validity === 'invalid'"
      >
        Enter a value with no numbers (this is the accessible error message, which assistive tech will only read when data is invalid)
      </p>
    </section>
    <section class="flex flex-col gap-4">
      <section class="flex flex-col gap-2">
        <label>Error message ID:</label>
        <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ errorMessage.id }}</code></pre>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { ref, watchEffect, readonly, computed } from 'vue'
import { useTextbox, useElementApi } from '@baleada/vue-features'
import { useStore } from '../composition'

export default {
  name: 'ExampleUseErrorMessage',
  setup () {
    const validity = ref<'valid' | 'invalid'>('valid'),
          textbox = useTextbox(),
          errorMessage = useElementApi({ identifies: true }),
          selectionJson = computed(() => JSON.stringify(textbox.text.selection, null, 2))

    watchEffect(() => /\d/.test(textbox.text.string) ? 'invalid' : 'valid')

    return {
      validity,
      textbox: readonly(textbox),
      errorMessage: readonly(errorMessage),
      selectionJson,
      store: useStore(),
    }
  }
}
</script>
