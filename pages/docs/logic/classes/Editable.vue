<template lang="html">
<ProseArticle title="Editable" updatedAt="Sun Oct 13 2019 20:06:33 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/classes/Editable.md">
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
