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
    '@components': '/src/components/index.js',
    '@functions': '/src/functions/index.js',
    '@state': '/src/state/index.js',
    '@prose-routes': '/src/prose/routes.js',
    '@manifest': '/src/state/manifest.js',
  })
  .includeDeps([
    '@baleada/logic',
  ])
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
  .vue({
    include: ['**/*.vue', '**/*.md'],
  })
  .configure()
