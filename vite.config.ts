import fastGlob from 'fast-glob'
import { readFileSync } from 'fs'
import matter from 'gray-matter'
import { configureable, Testable } from '@baleada/prepare'
import {
  proseToVueSfc,
  proseFilesToManifest,
  proseFilesToSearchableCandidates,
} from './source-transforms'

// Exclude any page whose frontmatter has `publish: false`
function toExclude (pagesDir: string): string[] {
  return fastGlob.sync(`${pagesDir}/**/*.md`).filter(
    file => !testRoute({ source: readFileSync(file, 'utf8'), id: file })
  )
}

const testRoute = ({ source, id }) => {
  const { data: { publish } } = matter(source)
  return publish && id.endsWith('.md')
}

export default new configureable.Vite()
  .alias({
    'virtual:manifest': '/src/state/manifest.ts',
    'virtual:searchableCandidates': '/src/state/searchableCandidates.ts',
    '@composition': '/src/composition/index.ts'
  })
  .excludeDeps([
    'virtual:manifest',
    'virtual:searchableCandidates',
  ])
  .sourceTransform({
    transform: proseToVueSfc,
    test: ({ id }) => id.endsWith('.md'),
  })
  .pages({
    pagesDir: 'src/prose',
    extensions: ['md'],
    exclude: toExclude('src/prose'),
    extendRoute: route => {
      switch (route.path) {
        case '/':
          route.path = '/docs'
          break
        default:
          route.path = `/docs${route.path}`
          break
      }
      
      return route
    }
  })
  .virtual({
    test: param => new Testable().idEndsWith('src/state/manifest.ts').test(param),
    transform: () => proseFilesToManifest(),
  })
  .virtual({
    test: param => new Testable().idEndsWith('src/state/searchableCandidates.ts').test(param),
    transform: () => proseFilesToSearchableCandidates(),
  })
  .vue({
    include: ['**/*.vue', '**/*.md'],
  })
  .configure()
