<template>
  <section
    class="
      mx-auto with-max-w flex flex-col gap-7 p-6 rounded-4 shadow-4
      bg-primary-10 dork:bg-primary-gray-110
    "
  >
    <section>
      <span class="preexisting-class" ref="example">👉 Inspect this <code>&lt;span&gt;</code> in devtools 👈</span>
    </section>
    <section class="flex flex-col gap-2">
      <label for="bind-example-ariaLabel-input">Edit the <code>aria-label</code> dynamically:</label>
      <input
        id="bind-example-ariaLabel-input"
        type="text"
        v-model="ariaLabel"
        class="
          form -shadow-4
          bg-white ring-primary-20 focus:ring-primary-70
          dork:bg-primary-gray-90 dork:ring-primary-gray-80 dork:focus:ring-primary-gray-40
        "
      />
    </section>
    <section class="flex flex-col gap-2">
      <label for="bind-example-class-input">Edit the <code>class</code> list dynamically:</label>
      <input
        id="bind-example-class-input"
        type="text"
        v-model="classes"
        class="
          form -shadow-4
          bg-white ring-primary-20 focus:ring-primary-70
          dork:bg-primary-gray-90 dork:ring-primary-gray-80 dork:focus:ring-primary-gray-40
        "
      />
    </section>
    <section class="flex flex-col gap-2">
      <label for="bind-example-backgroundColor-input">Edit the <code>backgroundColor</code> dynamically:</label>
      <input
        id="bind-example-backgroundColor-input"
        type="text"
        v-model="backgroundColor"
        class="
          form -shadow-4
          bg-white ring-primary-20 focus:ring-primary-70
          dork:bg-primary-gray-90 dork:ring-primary-gray-80 dork:focus:ring-primary-gray-40
        "
      />
    </section>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue'
import { bind } from '@baleada/vue-features'
import { useStore } from '../composition'

export default {
  name: 'ExampleBind',
  setup () {
    const ariaLabel = ref('Example label'),
          classes = ref('example-class another-class'),
          backgroundColor = ref('transparent'),
          example = ref(null)

    bind(
      example,
      {
        ariaLabel,
        class: classes,
        style_backgroundColor: backgroundColor,
        ariaHidden: 'true'
      }
    )
    
    return {
      ariaLabel,
      classes,
      example,
      backgroundColor,
      store: useStore(),
    }
  }
}
</script>
