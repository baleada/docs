<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/prose/logic/identifying-ui-logic.prose'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
