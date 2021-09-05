import { reactive } from 'vue'

export const context = reactive({
  article: {},
  statuses: {
    darkTheme: undefined, 
    minimalistTheme: undefined, 
  }
})
