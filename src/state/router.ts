import { createRouter, createWebHistory } from 'vue-router'
import { createClip } from '@baleada/logic'
import { routes } from './routes'

const history = createWebHistory(),
      router = createRouter({
        history,
        strict: true,
        routes,
      })

// remove trailing slashes
router.beforeEach((to, from) => {
  if (/.\/$/.test(to.path)) {
    to.meta.redirectCode = 301
    return `${createClip(/\/$/)(to.path)}`
  }

  return true
})

// redirect old vite-prefixed pages to new pages
router.beforeEach((to, from) => {
  if (/\/vite-/.test(to.path)) {
    to.meta.redirectCode = 301
    return `${createClip(/vite-/)(to.path)}`
  }

  return true
})


export { router }
