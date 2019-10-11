<template lang="html">
<ProseArticle title="Using with React" updatedAt="Wed Oct 09 2019 12:53:52 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/icons/using-with-react.md">
  <component :is="article" />
</ProseArticle>
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
