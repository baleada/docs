import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import '@fontsource/inter/variable.css'
import '@fontsource/inconsolata/variable.css'
import '@fontsource/caveat/400.css'
import '@fontsource/caveat/600.css'
import { globalComponents, plugins } from './state'

const app = createApp(App)

globalComponents.forEach(component => app.component(component.name, component))
plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
