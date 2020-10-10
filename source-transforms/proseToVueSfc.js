const matter = require('gray-matter'),
      { resolve } = require('path'),
      { default: gitlog } = require('gitlog'),
      { clipable } = require('@baleada/logic'),
      md = require('./util/md')


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
<LayoutArticleLog />\n\
\n\
${prose}\n\
<LayoutAdjacentArticleLinks />\n\
<LayoutArticleEdit />\n\
\n\
`
        
  return `\
  <template>\
  <ProseArticle>\
  ${md.render(withBaleadaDocsCustomizations)}\
  </ProseArticle>\
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

module.exports = transform

function toLog (id) {
  const basePath = resolve(''),
        relativePath = `${clipable(id).clip(basePath).clip(/^\//)}`,
        log = gitlog({ repo: basePath, file: relativePath, number: 1 })
  
  return log
}
