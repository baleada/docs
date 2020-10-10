import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { clipable } from '@baleada/logic'
import { useContext } from '../functions'
import routes from './routes'

const history = createWebHistory(),
      router = createRouter({
        history,
        strict: true,
        routes,
        // scrollBehavior not needed; it's handled by ProseArticle
      })

// remove trailing slashes
router.beforeEach((to, from) => {
  if (/.\/$/.test(to.path)) {
    to.meta.redirectCode = 301
    return `${clipable(to.path).clip(/\/$/)}`
  }

  return true
})

// redirect old vite-prefixed pages to new pages
router.beforeEach((to, from) => {
  if (/\/vite-/.test(to.path)) {
    to.meta.redirectCode = 301
    return `${clipable(to.path).clip(/vite-/)}`
  }

  return true
})

router.afterEach((to, from, failure) => {
  // set document title from frontMatter
  nextTick(() => nextTick(() => (document.title = useContext()?.article?.frontMatter?.title || 'Baleada')))
})

export default router
