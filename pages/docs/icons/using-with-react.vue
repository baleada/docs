<template lang="html">
<NiftyArticle title="Using with React" updatedAt="Sun Sep 29 2019 23:19:30 GMT-0600 (CST)" repoLink="https://gitlab.com/baleada/docs/tree/master/assets/markdown/icons/using-with-react.md">
  <component :is="article" />
</NiftyArticle>
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
