import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'

const app = createApp(App)

// Use the router, ElementPlus, and store
app.use(router)
app.use(ElementPlus)
app.use(store)

// Mount the app
app.mount('#app')
