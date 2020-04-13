<template lang="html">
<ProseArticle>
  <component :is="article" />
</ProseArticle>
</template>

<script>
import article from '~/assets/md/theme-utils/functions/withoutColorPalettes.md'

export default {
  layout: 'prose',
  setup () {
    return {
      article
    }
  }
}
</script>
