<template lang="html">
<ProseArticle title="Editable" updatedAt="Mon Oct 14 2019 16:51:53 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/classes/Editable.md">
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/markdown/logic/classes/Editable.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
