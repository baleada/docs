<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/prose/listenable-gestures/functions/drag.prose'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
