<template lang="html">
<ProseArticle title="Editable" updatedAt="Tue Oct 15 2019 18:41:03 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/md/logic/classes/Editable.md">
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/logic/classes/Editable.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
