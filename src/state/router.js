import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { clipable } from '@baleada/logic'
import { useContext } from '@functions'
import routes from './routes.js'

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


export default router
