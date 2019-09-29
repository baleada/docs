<template lang="html">
<NiftyArticle title="What is Baleada?" updatedAt="Thu Sep 26 2019 18:47:13 GMT-0600 (CST)">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/index.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
