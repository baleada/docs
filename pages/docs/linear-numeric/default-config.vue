<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/linear-numeric/default-config.md'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
