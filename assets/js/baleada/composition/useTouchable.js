import { reactive, onMounted, onBeforeUnmount } from '@vue/composition-api'
import { Touchable } from '@baleada/logic'

export default function useTouchable (state, options, store) {
  onMounted(() => {
    const instance = new Touchable(state.value, options),
          reactiveInstance = reactive(instance)

    store = reactiveInstance
  })
  onBeforeUnmount(() => {
    store.destroy()
  })
}
