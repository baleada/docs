import matter from 'gray-matter'
import { resolve } from 'path'
import gitlog from 'gitlog'
import { clipable } from '@baleada/logic'
import md from './util/md.js'


// TODO: set meta tags and head from data
const transform = ({ source, id }) => {
  const { content: prose, data: frontMatter } = matter(source),
        log = toLog(id),
        { 0: { files: { 0: relativePath } } } = log,
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
  <article>\
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

export default transform

function toLog (id) {
  const basePath = resolve(''),
        relativePath = `${clipable(id).clip(basePath).clip(/^\//)}`,
        log = gitlog({ repo: basePath, file: relativePath, number: 1 })
  
  return log
}
