import { ref, onMounted } from '@vue/composition-api'
import Markdownit from 'markdown-it'
import defaultMarkdownitOptions from '~/config/markdownit.config'

export default function useNifty (options = {}) {
  options = {
    renderOptions: {},
    postRender: markup => markup,
    ...options
  }
  const renderOptions = options.renderOptions,
        md = new Markdownit({ ...defaultMarkdownitOptions, renderOptions }),
        postRender = options.postRender,
        nifty = ref(null)

  onMounted(() => {
    const markup = postRender(md.render(nifty.value.innerHTML))
    nifty.value.innerHTML = markup
  })

  return nifty
}
