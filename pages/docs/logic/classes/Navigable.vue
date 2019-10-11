<template lang="html">
<ProseArticle title="Navigable" updatedAt="Wed Oct 09 2019 12:53:52 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/classes/Navigable.md">
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/markdown/logic/classes/Navigable.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
