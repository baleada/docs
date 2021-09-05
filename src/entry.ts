import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import 'typeface-inconsolata'
import 'typeface-caveat'
import { globalComponents, plugins } from './state'

const app = createApp(App)

globalComponents.forEach(component => app.component(component.name, component))
plugins.forEach(plugin => app.use(...plugin))

app.mount('#app')
