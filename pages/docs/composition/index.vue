<template lang="html">
<NiftyArticle title="What is Baleada Composition?" updatedAt="Sun Sep 22 2019 11:20:04 GMT-0600 (CST)">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/composition/index.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
