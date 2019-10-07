<template lang="html">
<NiftyArticle title="What is Baleada Icons?" updatedAt="Tue Oct 01 2019 14:39:54 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/icons/index.md">
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
