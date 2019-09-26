import { ref, onMounted } from '@vue/composition-api'
import useNuxtMarkdownit from './useNuxtMarkdownit'

export default function useNifty (options = {}) {
  const postRender = options.postRender === undefined ? markup => markup : options.postRender,
        md = useNuxtMarkdownit(),
        nifty = ref(null)

  onMounted(() => {
    const markup = postRender(md.render(nifty.value.innerHTML))
    nifty.value.innerHTML = markup
  })

  return nifty
}
