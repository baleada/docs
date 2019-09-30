import { reactive } from '@vue/composition-api'
import { Copiable } from '@baleada/logic'

export default function useCopiable (state, options) {
  const instance = new Copiable(state, options),
        reactiveInstance = reactive(instance)

  return reactiveInstance
}
