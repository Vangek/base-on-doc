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

// base-on-ui BaseFormJson 等组件依赖宿主上的 $i18n / $store / $tool，文档站提供最小占位以便演示可运行
app.config.globalProperties.$i18n = { locale: 'zh-cn' }
app.config.globalProperties.$store = {
  state: { curIndex: '' },
}
app.config.globalProperties.$tool = {
  getUUID(_prefix = '', len = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    const n = Math.max(1, Number(len) || 8)
    let s = ''
    for (let i = 0; i < n; i++) {
      s += chars[Math.floor(Math.random() * chars.length)]
    }
    return s
  },
}

app.use(router)
app.use(store)
app.use(elementIcons)

app.use(ElementPlus, {
  locale: locale,
  size: Cookies.get('size') || 'default'
})

app.mount('#app')
