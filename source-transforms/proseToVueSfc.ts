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
        withBaleadaDocsCustomizations = `\
:::
# ${frontMatter.title}
:::

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
