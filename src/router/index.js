import { createRouter, createWebHistory } from 'vue-router'
import routes from '../tests/routes'
import { HelloWorld } from '../components'

const history = createWebHistory()

export default createRouter({
  history,
  strict: true,
  routes: [
    { path: '/', name: 'Home', component: HelloWorld },
    ...routes,
    // { path: '/:data(.*)', component: HelloWorld, name: 'NotFound' },
  ],
})

