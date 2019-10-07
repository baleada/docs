<template lang="html">
<NiftyArticle title="What is Baleada Logic?" updatedAt="Sun Sep 22 2019 00:14:07 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/index.md">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/logic/index.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
