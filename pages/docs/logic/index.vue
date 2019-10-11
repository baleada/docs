<template lang="html">
<ProseArticle title="What is Baleada Logic?" updatedAt="Wed Oct 09 2019 12:53:52 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/index.md">
  <component :is="article" />
</ProseArticle>
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
