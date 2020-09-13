import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

// import { scrollWaiter } from './scrollWaiter'

const history = createWebHistory()

const router = createRouter({
  history,
  strict: true,
  routes,
  // async scrollBehavior(to, from, savedPosition) {
  //   await scrollWaiter.wait()
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     // TODO: check if parent in common that works with alias
  //     if (to.matched.every((record, i) => from.matched[i] !== record))
  //       return { left: 0, top: 0 }
  //   }
  //   // leave scroll as it is by not returning anything
  //   // https://github.com/Microsoft/TypeScript/issues/18319
  //   return false
  // },
})

// const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t))

// remove trailing slashes
router.beforeEach((to, from, next) => {
  if (/.\/$/.test(to.path)) {
    to.meta.redirectCode = 301
    next(to.path.replace(/\/$/, ''))
  } else next()
  // next()
})

// router.beforeEach(async (to, from, next) => {
//   // console.log(`Guard from ${from.fullPath} to ${to.fullPath}`)
//   if (to.params.id === 'no-name') return next(false)

//   const time = Number(to.query.delay)
//   if (time > 0) {
//     console.log('⏳ waiting ' + time + 'ms')
//     to.meta.waitedFor = time
//     await delay(time)
//   }
//   next()
// })

// router.beforeEach((to, from, next) => {
//   if (context.cancelNextNavigation) return next(false)
//   next()
// })

// router.afterEach((to, from) => {
//   // console.log(
//   //   `After guard: from ${from.fullPath} to ${
//   //     to.fullPath
//   //   } | location = ${location.href.replace(location.origin, '')}`
//   // )
// })

// router.beforeEach((to, from, next) => {
//   // console.log('second guard')
//   if (to.query.to) next(to.query.to as string)
//   else next()
// })

// const dirLog = {
//   '': '？',
//   back: '⏪',
//   forward: '⏩',
// }
// history.listen((to, from, info) => {
//   console.log(`${dirLog[info.direction]} as a ${info.type}`)
// })

export default router
