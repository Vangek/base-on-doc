import { createApp } from 'vue'

import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'

import '@/assets/styles/index.scss'

import App from './App.vue'
import store from './store'
import router from './router'
import elementIcons from '@/plugins/element-icons'

import './permission'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(elementIcons)

app.use(ElementPlus, {
  locale: locale,
  size: Cookies.get('size') || 'default'
})

app.mount('#app')
