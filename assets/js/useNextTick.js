import { computed } from '@vue/composition-api'
import { getRuntimeVM } from './runtime'

export default function useNextTick () {
  const vm = getRuntimeVM()
  return computed(() => vm.$nextTick)
}
