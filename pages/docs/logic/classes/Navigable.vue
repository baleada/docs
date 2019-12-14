<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/logic/classes/Navigable.md'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
