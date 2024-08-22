import { ref, computed, reactive, onMounted } from 'vue'
import { useStoreable, useListenable } from '@baleada/vue-composition'
import { bind, useElementApi } from '@baleada/vue-features'
import { createKeycomboMatch } from '@baleada/logic'

export type Theme = ReturnType<typeof useTheme>

export function useTheme (
  name: 'minimalist',
  keydown: ReturnType<typeof useListenable<'keydown'>>,
  keycombo: string,
) {
  // STATUS
  const storeable = useStoreable(`alexvipond_${name}_theme_status`),
        status = ref(storeable.string as 'enabled' | 'disabled'),
        enable = () => {
          storeable.store('enabled')
          status.value = storeable.string as 'enabled' | 'disabled'
        },
        disable = () => {
          storeable.store('disabled')
          status.value = storeable.string as 'enabled' | 'disabled'
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
    switch (storeable.status) {
    case 'ready':
      disable() // Disable by default
      break
    case 'stored':
    case 'removed':
      // do nothing
      break
    }

    

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
