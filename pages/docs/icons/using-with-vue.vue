<template lang="html">
<NiftyArticle title="Using with Vue" updatedAt="Thu Sep 26 2019 16:41:17 GMT-0600 (CST)">
  <component :is="article" />
</NiftyArticle>
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
