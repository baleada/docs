const matter = require('gray-matter'),
      { resolve } = require('path'),
      { default: gitlog } = require('gitlog'),
      { clipable } = require('@baleada/logic'),
      md = require('./util/md')


// TODO: set meta tags and head from data
const transform = ({ source, id }) => {
  const { content: markdown, data: frontMatter } = matter(source),
        stats = toStats(id),
        { files: { 0: relativePath } } = stats

  return `\
  <template>${md.render(markdown)}</template>\n\
  <script>\n\
  import { useContext } from '@baleada/vue-prose'\n\
  \n\
  export default {\n\
    setup () {\n\
      useContext(context => {\n\
        context.article.frontMatter = ${JSON.stringify(JSON.stringify(frontMatter))}\n\
        context.article.stats = ${JSON.stringify(JSON.stringify(stats))}\n\
        context.article.relativePath = ${JSON.stringify(JSON.stringify(relativePath))}\n\
      })\n\
    }\n\
  }\n\
  </script>\
  `
}

module.exports = transform

function toStats (id) {
  const basePath = resolve(''),
        relativePath = `${clipable(id).clip(basePath).clip(/^\//)}`,
        { 0: stats } = gitlog({ repo: basePath, file: relativePath, number: 1 })
  
  return stats
}
