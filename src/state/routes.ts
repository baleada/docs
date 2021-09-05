import { createClip } from '@baleada/logic'
import PageIndex from '../components/PageIndex.vue'
import LayoutThreeColumn from '../components/LayoutThreeColumn.vue'
import NotFound from '../components/NotFound.md'
import articles from 'virtual:generated-pages'

const withoutIndex = articles.map(({ path, component }) => ({
  path: createClip(/(?:^index|\/index$)/)(path),
  component,
}))

export const routes = [
  { path: '/', component: PageIndex, },
  { path: '/docs', component: LayoutThreeColumn, children: [...withoutIndex] },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: LayoutThreeColumn, children: [{ path: '', component: NotFound }] },
]
