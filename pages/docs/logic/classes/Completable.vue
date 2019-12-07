<template lang="html">
<ProseArticle>
  <template v-slot:before="{ frontMatter: { title } }">
    <ProseHeading :level="1"><span>{{ title }}</span></ProseHeading>
    <DocsArticleStats />
    <DocsMeta :tags="{ title }" />
  </template>
  <component :is="article" />
  <template v-slot:after="{}">
    <DocsAdjacentArticleLinks />
    <DocsArticleEdit />
  </template>
</ProseArticle>
</template>

<script>
import article from '~/assets/md/logic/classes/Completable.md'

import DocsArticleStats from '~/components/DocsArticleStats'
import DocsMeta from '~/components/DocsMeta'
import DocsAdjacentArticleLinks from '~/components/DocsAdjacentArticleLinks'
import DocsArticleEdit from '~/components/DocsArticleEdit'

export default {
  layout: 'prose',
  components: {
    DocsArticleStats,
    DocsMeta,
    DocsAdjacentArticleLinks,
    DocsArticleEdit,
  },
  setup () {
    return {
      article
    }
  }
}
</script>
