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
      <label>Reactively stored model value:</label>
      <pre class="px-2 py-1 mt-2 mb-0"><code class="mr-auto">{{ modelValueJson }}</code></pre>
    </section>
    <section class="flex flex-col gap-2">
      <label for="model-example-input">Edit the <code :class="store.statuses.darkTheme === 'enabled' ? 'bg-primary-gray-70' : 'bg-primary-10'">modelValue</code> dynamically:</label>
      <input
        ref="element"
        id="model-example-input"
        type="text"
        class="form -shadow-4"
        :class="[
          store.statuses.darkTheme === 'enabled'
            ? 'bg-primary-gray-90 ring-primary-gray-80 focus:ring-primary-gray-40'
            : 'bg-white ring-primary-20 focus:ring-primary-70'
          
        ]"
      />
    </section>
    <section class="flex flex-col gap-2">
      <label>Programmatically set the <code :class="store.statuses.darkTheme === 'enabled' ? 'bg-primary-gray-70' : 'bg-primary-10'">modelValue</code> to "Baleada":</label>
      <button
        @click="() => modelValue = 'Baleada'"
        class="mr-auto btn btn-grows btn-raised"
        :class="[
          store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
        ]"
      >
        Do the thing
      </button>
    </section>
  </section>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { model } from '@baleada/vue-features'
import { useStore } from '../composition'

export default {
  name: 'ExampleModel',
  setup () {
    const element = ref(null),
          modelValue = ref(''),
          modelValueJson = computed(() => JSON.stringify(modelValue.value))
    
    model({ element, modelValue })

    return { element, modelValue, modelValueJson, store: useStore() }
  }
}
</script>
