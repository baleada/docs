import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'typeface-inter'
import 'typeface-inconsolata'
import 'typeface-caveat'
import { globalComponents, plugins } from '@state'

const app = createApp(App)

globalComponents.forEach(component => app.component(component.name, component))
plugins.forEach(plugin => app.use(...plugin))

app.mount('#app')
