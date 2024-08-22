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
      <p :ref="description.ref()">Type an opening bracket or quote to autocomplete. Or, highlight text and type an opening bracket or quote to wrap the selected text.</p>
      <input
        :ref="textbox.root.ref({ describedBy: description.id })"
        type="text"
        placeholder="Type something..."
        aria-label="Example textbox with closing completion"
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
          aria-label="Autocomplete square brackets"
          @click="() => closingCompletion.close('[')"
        >
          [ ]
        </button>
        <button
          class="btn btn-grows btn-raised"
          :class="[
            store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
          ]"
          aria-label="Autocomplete parentheses"
          @click="() => closingCompletion.close('(')"
        >
          ( )
        </button>
        <button
          class="btn btn-grows btn-raised"
          :class="[
            store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
          ]"
          aria-label="Autocomplete curly brackets"
          @click="() => closingCompletion.close('{')"
        >
          { }
        </button>
        <button
          class="btn btn-grows btn-raised"
          :class="[
            store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
          ]"
          aria-label="Autocomplete angle brackets"
          @click="() => closingCompletion.close('<')"
        >
          &lt; &gt;
        </button>
        <button
          class="btn btn-grows btn-raised"
          :class="[
            store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
          ]"
          aria-label="Autocomplete double quotes"
          @click="() => closingCompletion.close(doubleQuote)"
        >
          " "
        </button>
        <button
          class="btn btn-grows btn-raised"
          :class="[
            store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
          ]"
          aria-label="Autocomplete single quotes"
          @click="() => closingCompletion.close('\'')"
        >
          ' '
        </button>
        <button
          class="btn btn-grows btn-raised"
          :class="[
            store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
          ]"
          aria-label="Autocomplete backticks"
          @click="() => closingCompletion.close('`')"
        >
          ` `
        </button>
      </section>
    </section>    
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
