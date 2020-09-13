import { PageIndex, LayoutThreeColumn } from '../components'
import articles from '../prose/routes.js'

export default [
  // Public
  { path: '/', component: PageIndex, },
  { path: '/docs', component: LayoutThreeColumn, children: [...articles] },
]
