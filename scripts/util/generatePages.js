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
<ProseArticle>\n\
  <template v-slot:before="{ frontMatter: { title } }">\n\
    <ProseHeading :level="1"><span>{{ title }}</span></ProseHeading>\n\
    <DocsArticleStats />\n\
    <DocsMeta :tags="{ title }" />\n\
  </template>\n\
  <component :is="article" />\n\
  <template v-slot:after="{}">\n\
    <DocsAdjacentArticleLinks />\n\
    <DocsArticleEdit />\n\
  </template>\n\
</ProseArticle>\n\
</template>\n\
\n\
<script>\n\
import article from '${path.replace(/^\./, '~')}'\n\
\n\
import DocsArticleStats from '~/components/DocsArticleStats'\n\
import DocsMeta from '~/components/DocsMeta'\n\
import DocsAdjacentArticleLinks from '~/components/DocsAdjacentArticleLinks'\n\
import DocsArticleEdit from '~/components/DocsArticleEdit'\n\
\n\
export default {\n\
  layout: 'prose',\n\
  components: {\n\
    DocsArticleStats,\n\
    DocsMeta,\n\
    DocsAdjacentArticleLinks,\n\
    DocsArticleEdit,\n\
  },\n\
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
    .replace(/assets\/md/, 'pages/docs')
    .replace(/\.md$/, '.vue')

  fs.writeFileSync(pagesPath, article)
}

module.exports = generatePages
