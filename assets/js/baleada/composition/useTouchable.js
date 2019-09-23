import { reactive } from '@vue/composition-api'
import { Touchable } from '@baleada/logic'

export default function useTouchable (state, options) {
  const instance = new Touchable(state, options),
        reactiveInstance = reactive(instance)

  return reactiveInstance
}
