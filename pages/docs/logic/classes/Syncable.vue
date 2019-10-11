<template lang="html">
<ProseArticle title="Syncable" updatedAt="Wed Oct 09 2019 12:53:52 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/classes/Syncable.md">
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/markdown/logic/classes/Syncable.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
