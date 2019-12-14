<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/icons/using-with-react.md'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
