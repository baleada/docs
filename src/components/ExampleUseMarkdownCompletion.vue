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
      <section class="flex gap-2 flex-nowrap justify-center py-2 overflow-x-scroll">
        <button
          v-for="({ name, icon, effect }) of effects"
          class="btn btn-grows btn-raised"
          :class="[
            store.statuses.darkTheme === 'enabled' && 'bg-primary-gray-70' || 'bg-white'
          ]"
          :aria-label="`Autocomplete ${name}`"
          @click="() => effect()"
        >
          <component :is="icon" class="h-5 w-5 fill-current" />
        </button>
      </section>
      <textarea
        :ref="textbox.root.ref()"
        type="text"
        placeholder="Type something..."
        aria-label="Example textbox with markdown completion"
        class="form -shadow-4 h-16"
        :class="[
          store.statuses.darkTheme === 'enabled'
            ? 'bg-primary-gray-90 ring-primary-gray-80 focus:ring-primary-gray-40'
            : 'bg-white ring-primary-20 focus:ring-primary-70'
      
        ]"
      />
      <section class="with-mt">
        <p><strong>Shortcuts*:</strong></p>
        <ul>
          <li
            v-for="({ name, display }) of effects"
          >
            <div class="flex gap-1 items-center">
              <pre 
                v-for="key in display.split('+')"
                class="m-0 inline-flex py-1 px-2"
              ><code class="uppercase tracking-3">{{ key }}</code></pre><span> for {{ name }}</span>
            </div>
          </li>
        </ul>
        <p class="text-3">* Shortcuts were custom-defined for this example—they're not built into markdown completion, and they're fully customizable.</p>
      </section>
    </section>    
  </section>
</template>

<script lang="ts">
import { readonly } from 'vue'
import { useTextbox, useMarkdownCompletion, on } from '@baleada/vue-features'
import { useStore } from '../composition'
import { createKeycomboMatch } from '@baleada/logic'
import type { ListenableKeycombo } from '@baleada/logic'
import {
  OcticonsBold24,
  OcticonsItalic24,
  OcticonsCode24,
  OcticonsLink24,
  OcticonsHeading24,
  OcticonsQuote24,
  OcticonsCodeSquare24,
// @ts-ignore
} from '@baleada/vue-octicons'

export default {
  name: 'ExampleUseMarkdownCompletion',
  setup () {
    const textbox = useTextbox(),
          markdownCompletion = useMarkdownCompletion(textbox),
          effects: {
            name: string,
            icon: typeof OcticonsBold24,
            display: ListenableKeycombo,
            predicateMac: ReturnType<typeof createKeycomboMatch>,
            predicateWindows: ReturnType<typeof createKeycomboMatch>,
            effect: Function,
          }[] = [
            {
              name: 'bold',
              icon: OcticonsBold24,
              display: 'cmd+b',
              predicateMac: createKeycomboMatch('cmd+b'),
              predicateWindows: createKeycomboMatch('ctrl+b'),
              effect: () => markdownCompletion.bold(),
            },
            {
              name: 'italic',
              icon: OcticonsItalic24,
              display: 'cmd+i',
              predicateMac: createKeycomboMatch('cmd+i'),
              predicateWindows: createKeycomboMatch('ctrl+i'),
              effect: () => markdownCompletion.italic(),
            },
            {
              name: 'inline code',
              icon: OcticonsCode24,
              display: 'cmd+e',
              predicateMac: createKeycomboMatch('!shift+cmd+e'),
              predicateWindows: createKeycomboMatch('!shift+ctrl+e'),
              effect: () => markdownCompletion.code(),
            },
            {
              name: 'link',
              icon: OcticonsLink24,
              display: 'cmd+k',
              predicateMac: createKeycomboMatch('cmd+k'),
              predicateWindows: createKeycomboMatch('ctrl+k'),
              effect: () => markdownCompletion.link(),
            },
            {
              name: 'heading 2',
              icon: OcticonsHeading24,
              display: 'cmd+h',
              predicateMac: createKeycomboMatch('cmd+h'),
              predicateWindows: createKeycomboMatch('ctrl+h'),
              effect: () => markdownCompletion.heading({ level: 2 }),
            },
            {
              name: 'blockquote',
              icon: OcticonsQuote24,
              display: 'cmd+shift+.',
              predicateMac: createKeycomboMatch('cmd+shift+.'),
              predicateWindows: createKeycomboMatch('ctrl+shift+.'),
              effect: () => markdownCompletion.blockquote(),
            },
            {
              name: 'codeblock',
              icon: OcticonsCodeSquare24,
              display: 'cmd+shift+e',
              predicateMac: createKeycomboMatch('cmd+shift+e'),
              predicateWindows: createKeycomboMatch('ctrl+shift+e'),
              effect: () => markdownCompletion.codeblock(),
            },
          ]

    on(
      textbox.root.element,
      {
        keydown: event => {
          for (const { predicateMac, predicateWindows, effect } of effects) {
            if (predicateMac(event) || predicateWindows(event)) {
              event.preventDefault()
              effect()
            }
          }
        }
      },
    )

    return {
      textbox: readonly(textbox),
      markdownCompletion: readonly(markdownCompletion),
      store: useStore(),
      effects,
    }
  }
}
</script>
