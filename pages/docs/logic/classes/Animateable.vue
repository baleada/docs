<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/prose/logic/classes/Animateable.prose'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
