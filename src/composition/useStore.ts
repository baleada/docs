import { ref, reactive, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import type gitlog from 'gitlog'

type Article = {
  log?: ReturnType<typeof gitlog>
  frontMatter?: {
    order?: number
    title?: string,
    summary?: string,
    image?: string,
    imageAlt?: string,
  },
  relativePath?: string
}

export const useStore = defineStore('app', () => {
  const statuses = reactive({
          darkTheme: undefined, 
          minimalistTheme: undefined, 
        }),
        article = reactive<Article>({}),
        articleRef = ref<HTMLElement>(null)

  return {
    statuses,
    article,
    articleRef,
  }
})
