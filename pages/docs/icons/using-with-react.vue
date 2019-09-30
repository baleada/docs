<template lang="html">
<NiftyArticle title="Using with React" updatedAt="Thu Sep 26 2019 16:41:14 GMT-0600 (CST)">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/icons/using-with-react.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
