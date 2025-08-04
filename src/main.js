import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


// استيراد vue-i18n
import { createI18n } from 'vue-i18n'
import en from '../vue-localization/en.json'
import ar from '../vue-localization/ar.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en', // أو 'ar' لتبدأ بالعربية
  fallbackLocale: 'en',
  messages: {
    en,
    ar
  }
})

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(i18n)
app.mount('#app')
