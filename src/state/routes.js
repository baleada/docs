import { clipable } from '@baleada/logic'
import { PageIndex, LayoutThreeColumn } from '../components'
import articles from '../prose/routes'

const withoutIndex = articles.map(({ path, component }) => ({
  path: `${clipable(path).clip(/\/index$/)}`,
  component,
}))

export default [
  { path: '/', component: PageIndex, },
  { path: '/docs', component: LayoutThreeColumn, children: [...withoutIndex] },
]
