<template lang="html">
<NiftyArticle title="Roadmap" updatedAt="Thu Sep 26 2019 18:51:05 GMT-0600 (CST)">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/roadmap.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
