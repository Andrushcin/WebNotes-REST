/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './bootstrap-5.0.2/dist/css/bootstrap.min.css'
import './assets/styles/main.css'
import './bootstrap-5.0.2/dist/js/bootstrap.bundle.min.js'

createApp(App).use(store).use(router).mount('#app')
