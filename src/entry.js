import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import 'typeface-inter'
import 'typeface-inconsolata'
import 'typeface-caveat'
import router from './router'
import { MarkdownComponent } from './components'
import { plugin as prosePlugin } from '@baleada/vue-prose'

const app = createApp(App)

app.use(router)
app.use(prosePlugin)

app.mount('#app')

app.component(MarkdownComponent.name, MarkdownComponent)
