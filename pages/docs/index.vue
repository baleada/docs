<template lang="html">
<ProseArticle title="What is Baleada?" updatedAt="Tue Oct 22 2019 14:27:21 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/md/index.md">
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/index.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
