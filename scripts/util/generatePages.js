const fs = require('fs')

function generatePages (metadata) {
  const published = metadata.filter(article => article.publish)

  published.forEach(article => {
    const page = toPage(article)
    write(page, article)
  })

  console.log(`Generated ${published.length} pages`)
}

function toPage ({ title, path, updatedAt }) {
  return `\
<template lang="html">\n\
<NiftyArticle title="${title}" updatedAt="${updatedAt}">\n\
  <component :is="article" />\n\
</NiftyArticle>\n\
</template>\n\
\n\
<script>\n\
import article from '${path.replace(/^\./, '~')}'\n\
export default {\n\
  layout: 'article',\n\
  setup () {\n\
    return {\n\
      article\n\
    }\n\
  }\n\
}\n\
</script>\n\
`
}

function write (article, { path }) {
  const pagesPath = path
    .replace(/assets\/markdown/, 'pages/docs')
    .replace(/\.md$/, '.vue')

  fs.writeFileSync(pagesPath, article)
}

module.exports = generatePages
