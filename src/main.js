import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/style.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
