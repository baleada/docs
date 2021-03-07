<template>
  <section
    class="mx-auto with-max-w flex flex-col gap-7 p-6 rounded-4 shadow-4"
    :class="[
      context.statuses.darkTheme === 'enabled'
        ? 'bg-primary-gray-80'
        : 'bg-primary-20 text-primary-100'
    ]"
  >
    <section>
      <span class="preexisting-class" ref="example">👉 Inspect this <code :class="context.statuses.darkTheme === 'enabled' ? 'bg-primary-gray-70' : 'bg-primary-10'">&lt;span&gt;</code> in devtools 👈</span>
    </section>
    <section class="flex flex-col gap-2">
      <label for="bind-example-ariaLabel-input">Edit the <code :class="context.statuses.darkTheme === 'enabled' ? 'bg-primary-gray-70' : 'bg-primary-10'">aria-label</code> dynamically:</label>
      <input
        id="bind-example-ariaLabel-input"
        type="text"
        v-model="ariaLabel"
        class="form -shadow-4"
        :class="[
          context.statuses.darkTheme === 'enabled'
            ? 'bg-primary-gray-90 ring-primary-gray-80 focus:ring-primary-gray-40'
            : 'bg-white ring-primary-20 focus:ring-primary-70'
          
        ]"
      />
    </section>
    <section class="flex flex-col gap-2">
      <label for="bind-example-class-input">Edit the <code :class="context.statuses.darkTheme === 'enabled' ? 'bg-primary-gray-70' : 'bg-primary-10'">class</code> list dynamically:</label>
      <input
        id="bind-example-class-input"
        type="text"
        v-model="classes"
        class="form -shadow-4"
        :class="[
          context.statuses.darkTheme === 'enabled'
            ? 'bg-primary-gray-90 ring-primary-gray-80 focus:ring-primary-gray-40'
            : 'bg-white ring-primary-20 focus:ring-primary-70'
          
        ]"
      />
    </section>
    <section class="flex flex-col gap-2">
      <label for="bind-example-backgroundColor-input">Edit the <code :class="context.statuses.darkTheme === 'enabled' ? 'bg-primary-gray-70' : 'bg-primary-10'">backgroundColor</code> dynamically:</label>
      <input
        id="bind-example-backgroundColor-input"
        type="text"
        v-model="backgroundColor"
        class="form -shadow-4"
        :class="[
          context.statuses.darkTheme === 'enabled'
            ? 'bg-primary-gray-90 ring-primary-gray-80 focus:ring-primary-gray-40'
            : 'bg-white ring-primary-20 focus:ring-primary-70'
          
        ]"
      />
    </section>
  </section>
</template>

<script>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { bind } from '@baleada/vue-features/affordances'
import { useContext } from '@functions'

export default {
  name: 'ExampleBind',
  setup () {
    const ariaLabel = ref('Example label'),
          classes = ref('example-class another-class'),
          backgroundColor = ref('transparent'),
          example = ref(null)

    bind({
      target: example,
      attributes: {
        ariaLabel,
        class: classes,
        style_backgroundColor: backgroundColor,
        ariaHidden: 'true'
      }
    })
    
    return {
      ariaLabel,
      classes,
      example,
      backgroundColor,
      context: useContext(),
    }
  }
}
</script>
