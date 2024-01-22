import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'


const pinia = createPinia()
const app = createApp(App)

app.use(vuetify)
app.use(pinia)
app.use(router)

const store = useAuthStore()
store.initStore()

app.mount('#app')
