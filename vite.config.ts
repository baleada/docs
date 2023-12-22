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
    '@composition': '/src/composition/index.ts',
    '@octicons': '/node_modules/@primer/octicons/build/svg',
    '@simple-icons': '/node_modules/simple-icons/icons',
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
  .sourceTransform({
    test: param => new Testable().include(/(@primer\/octicons|simple-icons|src\/icons)/).test(param),
    transform: ({ id }) => toIconSfc(readFileSync(`${id}`, { encoding: 'utf8' })),
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
    include: ['**/*.vue', '**/*.md', '**/*.svg'],
  })
  .inspect()
  .configure()

function toIconSfc (svg: string) {
  return `<template>${svg.replace(/svg/, 'svg aria-hidden="true" class="fill-current"')}</template>`
}
