import matter from 'gray-matter'
import { resolve } from 'path'
import gitlog from 'gitlog'
import { md } from './util'

// TODO: set meta tags and head from data
export const proseToVueSfc = ({ source, id }) => {
  const { content: prose, data: frontMatter } = matter(source),
        log = toLog(id),
        { 0: { files: { 0: relativePath } } } = (() => {
          if (log.length === 0) {
            console.warn(`\n\nNo git log found for ${id}\n\n`)
          }

          return log
        })(),
        sourceLink = toSourceLink({ id, frontMatter }),
        withBaleadaDocsCustomizations = `\
:::
# ${frontMatter.title}
:::

${sourceLink ? '<LayoutArticleLinks></LayoutArticleLinks>' : ''}
<LayoutArticleLog></LayoutArticleLog>

${prose}
<LayoutAdjacentArticleLinks></LayoutAdjacentArticleLinks>
<LayoutArticleEdit></LayoutArticleEdit>

`

  return `\
<template>
  <article class="baleada-prose-article">
  ${md.render(withBaleadaDocsCustomizations)}
  </article>
</template>
<script>
import { useStore } from '@composition'

export default {
  setup () {
    const store = useStore()
    
    store.article.log = ${JSON.stringify(log)}
    store.article.frontMatter = ${JSON.stringify(frontMatter)}
    store.article.relativePath = '${relativePath}'
    store.article.source = ${sourceLink ? `'${sourceLink}'` : sourceLink}
  }
}
</script>
`
}

function toLog (id) {
  const basePath = resolve(''),
        relativePath = id
          .replace(basePath, '')
          .replace(/^\//, ''),
        log = gitlog({ repo: basePath, file: relativePath, number: 1 })
  
  return log
}

const overviewRE = /-overview\.ts$/
function toSourceLink({ id, frontMatter }) {
  if (!frontMatter.source) return false

  const basePath = resolve(''),
        project = id
          .replace(basePath, '')
          .replace(/^\/src\/prose\//, '')
          .replace(/\/.*$/, ''),
        repo = project in repoPrefixesByProject ? `${repoPrefixesByProject[project]}-${project}` : project,
        fileName = id.match(/[^/]+$/)[0].replace(/md$/, 'ts')

  if (fileName === 'index.ts' && frontMatter.source === true) {
    return `https://github.com/baleada/${repo}`
  }
  
  const pathRelativeToSrc = id
          .replace(basePath, '')
          .replace(/^\/src\/prose\//, '')
          .match(/\/(.*$)/)[1]
          .split('/')
          .slice(0, -1)
          .join('/'),
        linkBegin = `https://github.com/baleada/${repo}/tree/main/src/${pathRelativeToSrc}`

  if (overviewRE.test(fileName) && frontMatter.source === true) {
    return `${linkBegin}${fileName.replace(overviewRE, '')}`
  }

  return frontMatter.source === true
    ? `${linkBegin}/${fileName}`
    : `${linkBegin}/${frontMatter.source}`
}


const repoPrefixesByProject = {
  'ancestor-variants': 'tailwind',
  composition: 'vue',
  features: 'vue',
  'linear-numeric': 'tailwind',
  prose: 'vue',
  'prose-container': 'markdown-it',
  'source-transform': 'rollup-plugin',
  'spa-links': 'markdown-it',
  utilities: 'tailwind',
}
