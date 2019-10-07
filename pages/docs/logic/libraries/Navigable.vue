<template lang="html">
<NiftyArticle title="Navigable" updatedAt="Sun Oct 06 2019 17:40:13 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/logic/libraries/Navigable.md">
  <component :is="article" />
</NiftyArticle>
</template>

<script>
import article from '~/assets/markdown/logic/libraries/Navigable.md'
export default {
  layout: 'article',
  setup () {
    return {
      article
    }
  }
}
</script>
