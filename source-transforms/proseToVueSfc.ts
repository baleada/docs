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
:::\n\
# ${frontMatter.title}\n\
:::\n\
\n\
<LayoutArticleLog></LayoutArticleLog>\n\
\n\
${prose}\n\
<LayoutAdjacentArticleLinks></LayoutAdjacentArticleLinks>\n\
<LayoutArticleEdit></LayoutArticleEdit>\n\
\n\
`
        
  return `\
  <template>\
  <article class="baleada-prose-article">\
  ${md.render(withBaleadaDocsCustomizations)}\
  </article>\
  </template>\n\
  <script>\n\
  import { useContext } from '@functions'\n\
  \n\
  export default {\n\
    setup () {\n\
      useContext(context => {\n\
        context.article.log = ${JSON.stringify(log)}\n\
        context.article.frontMatter = ${JSON.stringify(frontMatter)}\n\
        context.article.relativePath = '${relativePath}'\n\
      })\n\
    }\n\
  }\n\
  </script>\
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
