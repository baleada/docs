<template lang="html">
<NiftyArticle title="What is Baleada Icons?" updatedAt="Thu Sep 26 2019 17:41:33 GMT-0600 (CST)">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/icons/index.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
