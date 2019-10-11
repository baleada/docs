<template lang="html">
<ProseArticle title="Types of tools" updatedAt="Wed Oct 09 2019 12:53:52 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/types-of-tools.md">
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/markdown/types-of-tools.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
