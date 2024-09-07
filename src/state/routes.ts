import { pipe } from 'lazy-collections'
import { createClip } from '@baleada/logic'
import PageIndex from '../components/PageIndex.vue'
import LayoutThreeColumn from '../components/LayoutThreeColumn.vue'
import NotFound from '../components/NotFound.md'
import articles from 'virtual:generated-pages'
import type { RouteRecordRaw } from 'vue-router'

const toWithoutIndex = createClip(/(?:^index|\/index$)/),
      toWithoutOrder = createClip(/\d+-/),
      concise = articles
        .map(({ path, name, component }) => ({
          path: pipe(toWithoutIndex, toWithoutOrder)(path),
          name: toWithoutOrder(name as string),
          component,
        }))

export const routes: RouteRecordRaw[] = [
  { path: '/', component: PageIndex, },
  { path: '/docs', component: LayoutThreeColumn, children: [...concise] },
  { path: '/:pathMatch(.*)*', component: LayoutThreeColumn, children: [{ name: 'NotFound', path: '', component: NotFound }] },
]
