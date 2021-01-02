import matter from 'gray-matter'
import { configureable, testable } from '@baleada/prepare'
import sourceTransformProseToVueSfc from './source-transforms/proseToVueSfc.js'
import proseFilesToManifest from './source-transforms/proseFilesToManifest.js'
import proseFilesToSearchableCandidates from './source-transforms/proseFilesToSearchableCandidates.js'

const testRoute = ({ source, id }) => {
  // Exclude dotfiles
  if (testable().include('**/.**').test(id)) {
    return false
  }

  const { data: { publish } } = matter(source)
  return publish && id.endsWith('.md')
}
      
export default configureable('vite')
  .alias({
    '@components': '/src/components',
    '@functions': '/src/functions',
    '@state': '/src/state',
  })
  .koa(koa => koa
    .asVue({
      toVue: sourceTransformProseToVueSfc,
      include: '**/*.md',
    })
    .virtual.index('src/components')
    .virtual.index('src/functions')
    .virtual.index('src/state')
    .virtual.routes({ path: 'src/prose/routes', router: 'vue' }, { test: testRoute, transformPath: path => path.replace(/^\//, '').replace(/\/index$/, '') })
    .virtual({
      test: testable().idEndsWith('src/state/manifest').test,
      transform: () => ({
        type: 'js',
        source: proseFilesToManifest(),
      }),
    })
    .virtual({
      test: testable().idEndsWith('src/state/searchableCandidates').test,
      transform: () => ({
        type: 'js',
        source: proseFilesToSearchableCandidates(),
      }),
    })
    .configure()
  )
  .rollup(rollup => rollup
    .sourceTransform({
      include: '**/*.md',
      transform: sourceTransformProseToVueSfc,
    })
    .virtual.index('src/components')
    .virtual.index('src/functions')
    .virtual.index('src/state')
    .virtual.routes({ path: 'src/prose/routes', router: 'vue' }, { test: testRoute, transformPath: path => path.replace(/^\//, '').replace(/\/index$/, '') })
    .virtual({
      test: testable().idEndsWith('src/state/manifest').test,
      transform: () => proseFilesToManifest(),
    })
    .virtual({
      test: testable().idEndsWith('src/state/searchableCandidates').test,
      transform: () => proseFilesToSearchableCandidates(),
    })
    .configure()
  )
  .rollup.vue({
    include: ['**/*.vue', '**/*.md'],
  })
  .includeDeps([
    '@baleada/logic',
    '@baleada/vue-prose/plugin',
  ])
  .configure()

