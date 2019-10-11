<template lang="html">
<ProseArticle title="Using with Vue" updatedAt="Wed Oct 09 2019 12:53:52 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/icons/using-with-vue.md">
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/markdown/icons/using-with-vue.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
