import { ref, computed, reactive, onMounted } from 'vue'
import { useListenable } from '@baleada/vue-composition'
import { bind, useElementApi } from '@baleada/vue-features'
import { createKeycomboMatch } from '@baleada/logic'

export type Preference = ReturnType<typeof usePreference>

export function usePreference (
  name: 'dork',
  query: `(${string})`,
  keydown: ReturnType<typeof useListenable<'keydown'>>,
  keycombo: string,
) {
  // STATUS
  const listenable = useListenable(query),
        status = ref('disabled' as 'enabled' | 'disabled'),
        enable = () => {
          status.value = 'enabled'
        },
        disable = () => {
          status.value = 'disabled'
        },
        toggle = () => {
          switch (status.value) {
          case null:
            // do nothing
            break
          case 'enabled':
            disable()
            break
          case 'disabled':
            enable()
            break
          }
        },
        predicateKeycombo = createKeycomboMatch(keycombo)
        
  onMounted(() => {
    status.value = [
      ...listenable
        .listen(event => status.value = event.matches ? 'enabled' : 'disabled')
        .active,
    ][0].target.matches ? 'enabled' : 'disabled'

    keydown.listen(event => {
      if (['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) return

      if (!predicateKeycombo(event)) return
      
      event.preventDefault()
      toggle()
    })
  })


  // ANCESTOR VARIANTS
  const body = useElementApi()
  onMounted(() => {
    body.element.value = document.body
  })

  bind(
    body.element,
    { class: computed(() => status.value === 'enabled' ? name : '') }
  )

  return reactive({
    status,
    enable,
    disable,
    toggle,
  })
}
