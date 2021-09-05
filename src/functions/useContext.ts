import { nextTick } from 'vue'
import { context } from '../state'

export function useContext (writeCallback?: Function) {
  if (!writeCallback) {
    return context
  }
  
  // Not sure why this is needed but it works
  nextTick(() => writeCallback(context))
}
