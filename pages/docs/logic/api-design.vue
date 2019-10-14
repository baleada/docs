<template lang="html">
<ProseArticle title="API design" updatedAt="Mon Oct 14 2019 16:46:57 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/api-design.md">
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/markdown/logic/api-design.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
