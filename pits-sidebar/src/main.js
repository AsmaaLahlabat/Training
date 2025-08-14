import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import en from './vue-localization/en.json'
import ar from './vue-localization/ar.json'
import { createPinia } from 'pinia' // ✅ إضافة Pinia

// استيراد Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'

// إعداد i18n
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, ar }
})

// إنشاء التطبيق
const app = createApp(App)

// استخدام Pinia + Router + i18n
app.use(createPinia()) // ✅ تفعيل Pinia
app.use(router).use(i18n)

// تغيير اتجاه الصفحة حسب اللغة
watch(
  () => i18n.global.locale.value,
  (newLocale) => {
    document.documentElement.setAttribute('dir', newLocale === 'ar' ? 'rtl' : 'ltr')
  },
  { immediate: true }
)

// تشغيل التطبيق
app.mount('#app')
