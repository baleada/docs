import type { Plugin } from 'vue'
import { router } from './router'
import { components, createProse } from '@baleada/vue-prose'
import { createPinia } from 'pinia'
import { useStore } from '../composition'

export const plugins: Plugin[] = [
  router,
  createPinia(),
  createProse({
    components,
    createsPinia: false,
    getFullPath: 'vue-router',
    propDefaults: {
      blockquote: {
        readerCanTweet: true,
        tweetVia: 'BaleadaToolkit',
        tweetUrl: 'current',
      },
      codeblock: {
        readerCanCopy: true,
      },
      heading: {
        classes: '',
        readerCanCopy: true,
      },
    }
  })
]
