import { string } from '@baleada/logic'
import { PageIndex, LayoutThreeColumn, NotFound } from '@components'
import articles from '@prose-routes'

const withoutIndex = articles.map(({ path, component }) => ({
  path: `${string(path).clip(/(?:^index|\/index$)/)}`,
  component,
}))

export default [
  { path: '/', component: PageIndex, },
  { path: '/docs', component: LayoutThreeColumn, children: [...withoutIndex] },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: LayoutThreeColumn, children: [{ path: '', component: NotFound }] },
]
