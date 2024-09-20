<template>
  <section class="mx-auto with-max-w flex-col/7">
    <p :ref="description.ref()">Type an opening bracket or quote to autocomplete. Or, highlight text and type an opening bracket or quote to wrap the selected text.</p>
    <input
      :ref="textbox.root.ref({ describedBy: description.id })"
      type="text"
      placeholder="Type something..."
      aria-label="Example textbox with closing completion"
      class="form textbox"
    />
  </section>
</template>

<script lang="ts">
import { readonly, shallowRef } from 'vue'
import { useTextbox, useClosingCompletion, useElementApi } from '@baleada/vue-features'
import { useStore } from '../composition'

export default {
  name: 'ExampleUseClosingCompletion',
  setup () {
    const textbox = useTextbox(),
          closingCompletion = useClosingCompletion(textbox),
          description = useElementApi({ identifies: true })

    return {
      textbox: readonly(textbox),
      closingCompletion: readonly(closingCompletion),
      description: readonly(description),
      store: useStore(),
      doubleQuote: shallowRef('"' as const),
    }
  }
}
</script>
