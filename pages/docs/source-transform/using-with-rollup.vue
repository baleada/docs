<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/source-transform/using-with-rollup.md'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
