import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { createContext } from '@baleada/vue-prose'

export default function createProseContext (articleRef) {
  const route = useRoute(),
        fullPath = computed(() => route.fullPath),
        defaultProps = {
          article: {
            getScrollableContainer: () => articleRef.value === null ? document : articleRef.value
          },
          blockquote: {
            readerCanTweet: true,
            tweetVia: 'BaleadaToolkit',
            tweetUrl: 'current',
          },
          codeblock: {
            readerCanCopy: true,
          },
          heading: {
            classes: '',
            readerCanCopy: true,
          },
        }

  createContext(
    { fullPath },
    { defaultProps }
  )
}
