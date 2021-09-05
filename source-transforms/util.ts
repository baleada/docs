import { configureable } from '@baleada/prepare'

export const md = new configureable.Markdownit()
  .html()
  .linkify()
  .highlight('refractorRehypeWithEscapedVueMustache')
  .proseContainer({ template: 'vue' })
  .spaLinks({ spa: 'vue' })
  .linkAttributes({ attrs: { rel: 'noopener' } })
  .configure()
