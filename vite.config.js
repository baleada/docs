import matter from 'gray-matter'
import { configureable, testable } from '@baleada/prepare'
import sourceTransformProseToVueSfc from './source-transforms/proseToVueSfc.js'
import proseFilesToManifest from './source-transforms/proseFilesToManifest.js'
import proseFilesToSearchableCandidates from './source-transforms/proseFilesToSearchableCandidates.js'

import vue from '@vitejs/plugin-vue'
import resolve from '@rollup/plugin-node-resolve'

const testRoute = ({ source, id }) => {
  // Exclude dotfiles
  if (testable().include('**/.**').test(id)) {
    return false
  }

  const { data: { publish } } = matter(source)
  return publish && id.endsWith('.md')
}

export default {
  ...configureable('vite')
    .alias({
      '@components': '/src/components',
      '@functions': '/src/functions',
      '@state': '/src/state',
    })
    .includeDeps([
      '@baleada/logic',
    ])
    .configure(),
  plugins: [
    resolve(),
    ...configureable('rollup')
      .sourceTransform({
        transform: sourceTransformProseToVueSfc,
        test: ({ id }) => id.endsWith('.md'),
      })
      .virtual.index('components')
      .virtual.index('functions')
      .virtual.index('state')
      .virtual.routes({ path: 'prose/routes', router: 'vue' }, { test: testRoute, transformPath: path => path.replace(/^\//, '').replace(/\/index$/, '') })
      .virtual({
        test: testable().idEndsWith('src/state/manifest').test,
        transform: () => proseFilesToManifest(),
      })
      .virtual({
        test: testable().idEndsWith('src/state/searchableCandidates').test,
        transform: () => proseFilesToSearchableCandidates(),
      })
      .configure()
      .plugins,
    vue({
      include: ['**/*.vue', '**/*.md'],
    }), 
  ]
}
