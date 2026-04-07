import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useSettingsStore from '@/store/modules/settings'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta?.title) {
    useSettingsStore().setTitle(to.meta.title)
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
