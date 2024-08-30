import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type gitlog from 'gitlog'
import { useListenable } from '@baleada/vue-composition'
import { useTheme } from './useTheme'
import { usePreference } from './usePreference'

type Article = {
  log?: ReturnType<typeof gitlog>
  frontMatter?: {
    order?: number
    title?: string,
    summary?: string,
    image?: string,
    imageAlt?: string,
    source?: string | boolean,
  },
  source?: string,
  tests?: string,
  stub?: string,
  relativePath?: string
}

export type Store = ReturnType<typeof useStore>

export const useStore = defineStore('app', () => {
  const article = reactive<Article>({}),
        articleRef = ref<HTMLElement>(null),
        keydown = useListenable('keydown'),
        dorkTheme = usePreference(
          'dork',
          '(prefers-color-scheme: dark)',
          keydown,
          'shift+d',
        ),
        minimalistTheme = useTheme(
          'minimalist',
          keydown,
          'shift+m',
        )

  return {
    article,
    articleRef,
    dorkTheme,
    minimalistTheme,
  }
})
