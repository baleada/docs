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
  })
  .includeDeps([
    '@baleada/logic',
  ])
  .sourceTransform({
    transform: proseToVueSfc,
    test: ({ id }) => id.endsWith('.md'),
  })
  .pages({
    pagesDir: 'src/prose',
    extensions: ['md'],
    exclude: toExclude('src/prose'),
  })
  .virtual({
    test: new Testable().idEndsWith('src/state/manifest.ts').test,
    transform: () => proseFilesToManifest(),
  })
  .virtual({
    test: new Testable().idEndsWith('src/state/searchableCandidates.ts').test,
    transform: () => proseFilesToSearchableCandidates(),
  })
  .vue({
    include: ['**/*.vue', '**/*.md'],
  })
  .configure()
