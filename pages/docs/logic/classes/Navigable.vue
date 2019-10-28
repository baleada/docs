<template lang="html">
<ProseArticle title="Navigable" updatedAt="Wed Oct 09 2019 12:53:52 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/md/logic/classes/Navigable.md">
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/logic/classes/Navigable.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
