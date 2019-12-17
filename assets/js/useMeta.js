import { getCurrentInstance } from '@vue/composition-api'

export default function(tags) {
  const vm = getCurrentInstance()
  vm.metaInfo = tags
}
