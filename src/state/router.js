import { createRouter, createWebHistory } from 'vue-router'
import { clipable } from '@baleada/logic'
import routes from './routes'

const history = createWebHistory(),
      router = createRouter({
        history,
        strict: true,
        routes,
        // scrollBehavior not needed; it's handled by ProseArticle
      })

// remove trailing slashes
router.beforeEach((to, from, next) => {
  if (/.\/$/.test(to.path)) {
    to.meta.redirectCode = 301
    return next(`${clipable(to.path).clip(/\/$/)}`)
  }
  
  return next()
})

// redirect old vite-prefixed pages to new pages
router.beforeEach((to, from, next) => {
  if (/\/vite-/.test(to.path)) {
    to.meta.redirectCode = 301
    return next(`${clipable(to.path).clip(/vite-/)}`)
  }
  
  return next()
})

// router.afterEach((to, from) => {
//   set document title from proseContext.article.frontmatter
// })

