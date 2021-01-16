import { reactive } from 'vue'
import { useStoreable } from '@baleada/vue-composition'

export default reactive({
  article: {},
  statuses: {
    darkTheme: undefined, 
    minimalistTheme: undefined, 
  }
})
