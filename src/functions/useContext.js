import { nextTick } from 'vue'
import { context } from '@state'

export default function useContext (writeCallback) {
  if (!writeCallback) {
    return context
  }
  
  // Not sure why this is needed but it works
  nextTick(() => writeCallback(context))
}
