<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/prose/logic/classes/Listenable.prose'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
