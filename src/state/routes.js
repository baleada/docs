import { PageIndex, LayoutThreeColumn } from '../components'
import articles from '../prose/routes'

export default [
  { path: '/', component: PageIndex, },
  { path: '/docs', component: LayoutThreeColumn, children: [...articles] },
]
