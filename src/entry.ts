import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/400-italic.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/500-italic.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/600-italic.css'
import '@fontsource/fira-code/400.css' 
import '@fontsource/fira-code/500.css' 
import '@fontsource/fira-code/600.css' 
import '@fontsource/caveat/400.css'
import '@fontsource/caveat/600.css'
import { globalComponents, plugins } from './state'

const app = createApp(App)

// @ts-expect-error
globalComponents.forEach(component => app.component(component.__name || component.name, component))
plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
