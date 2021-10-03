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
      <p :ref="description.root.ref">Type an opening bracket or quote to autocomplete. Or, highlight text and type an opening bracket or quote to wrap the selected text.</p>
      <input
        :ref="textbox.root.ref"
        type="text"
        placeholder="Type something..."
        aria-label="Example textbox with markdown completion"
        class="form -shadow-4"
        :class="[
          store.statuses.darkTheme === 'enabled'
            ? 'bg-primary-gray-90 ring-primary-gray-80 focus:ring-primary-gray-40'
            : 'bg-white ring-primary-20 focus:ring-primary-70'
      
        ]"
      />
      <section class="flex gap-2">
        <button
          v-for="({ name, mac, icon: ButtonIcon, effect }) of effects"
          class="btn btn-grows btn-raised flex-col"
          :class="[
            store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
          ]"
          :aria-label="`Autocomplete ${name}`"
          @click="() => effect()"
        >
          <ButtonIcon />
          <code class="text-3">{{ mac }}</code>
        </button>
      </section>
    </section>    
  </section>
</template>

<script lang="ts">
import { readonly } from 'vue'
import { useTextbox, useMarkdownCompletion, useDescription, on } from '@baleada/vue-features'
import { useStore } from '../composition'
import type { ListenableKeycombo, ListenEffect } from '@baleada/logic'
// @ts-ignore
import { OcticonsBold, OcticonsItalic } from '@baleada/vue-octicons'

export default {
  name: 'ExampleUseClosingCompletion',
  setup () {
    const textbox = useTextbox(),
          markdownCompletion = useMarkdownCompletion(textbox),
          description = useDescription(textbox),
          effects: {
            name: string,
            icon: typeof OcticonsBold,
            mac: ListenableKeycombo,
            windows: ListenableKeycombo,
            effect: Function,
          }[] = [
            {
              name: 'bold',
              icon: OcticonsBold,
              mac: 'cmd+b',
              windows: 'ctrl+b',
              effect: () => markdownCompletion.bold(),
            },
            {
              name: 'italic',
              icon: OcticonsItalic,
              mac: 'cmd+i',
              windows: 'ctrl+i',
              effect: () => markdownCompletion.italic(),
            }
          ]

    on<ListenableKeycombo>({
      element: textbox.root.element,
      effects: defineEffect => [
        ...effects.map(({ mac, effect }) => defineEffect(mac, () => effect())),
        ...effects.map(({ windows, effect }) => defineEffect(windows, () => effect())),
      ]
    })

    return {
      textbox: readonly(textbox),
      markdownCompletion: readonly(markdownCompletion),
      description: readonly(description),
      store: useStore(),
      effects,
    }
  }
}
</script>
