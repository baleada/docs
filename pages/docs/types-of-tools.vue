<template lang="html">
<NiftyArticle title="Types of tools" updatedAt="Thu Sep 26 2019 17:38:46 GMT-0600 (CST)">
  <component :is="article" />
</NiftyArticle>
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
