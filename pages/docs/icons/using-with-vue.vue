<template lang="html">
<NiftyArticle title="Using with Vue" updatedAt="Sun Sep 29 2019 19:29:41 GMT-0600 (CST)">
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
