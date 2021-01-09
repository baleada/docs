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
      '@components': '/src/components/index.js',
      '@functions': '/src/functions/index.js',
      '@state': '/src/state/index.js',
      '@prose-routes': '/src/prose/routes.js',
      '@manifest': '/src/state/manifest.js',
    })
    .includeDeps([
      '@baleada/logic',
    ])
    .configure(),
  plugins: [
    resolve(),
    ...configureable('rollup')
      // .plugin({
      //   resolveId: (source, importer) => {
      //     console.log({ source, importer })
      //     return null
      //   }
      // })
      .sourceTransform({
        transform: sourceTransformProseToVueSfc,
        test: ({ id }) => id.endsWith('.md'),
      })
      .virtual.index('src/components/index.js')
      .virtual.index('src/functions/index.js')
      .virtual.index('src/state/index.js')
      .virtual.routes({ path: 'prose/routes.js', router: 'vue' }, { test: testRoute, transformPath: path => path.replace(/^\//, '').replace(/\/index$/, '') })
      .virtual({
        test: testable().idEndsWith('src/state/manifest.js').test,
        transform: () => proseFilesToManifest(),
      })
      .virtual({
        test: testable().idEndsWith('src/state/searchableCandidates.js').test,
        transform: () => proseFilesToSearchableCandidates(),
      })
      .configure()
      .plugins.map(plugin => ({ ...plugin, enforce: 'pre' })),
    vue({
      include: ['**/*.vue', '**/*.md'],
    }), 
  ]
}
