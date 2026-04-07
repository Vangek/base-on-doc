import { createWebHistory, createRouter } from 'vue-router'
import SimpleLayout from '@/layout/SimpleLayout.vue'

const routes = [
  {
    path: '/',
    component: SimpleLayout,
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('@/views/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'guide',
        component: () => import('@/layout/DocShellLayout.vue'),
        children: [
          {
            path: '',
            name: 'Guide',
            component: () => import('@/views/guide/QuickStart.vue'),
            meta: { title: '快速上手' }
          }
        ]
      },
      {
        path: 'components',
        component: () => import('@/layout/DocShellLayout.vue'),
        children: [
          {
            path: '',
            name: 'Components',
            component: () => import('@/views/components/index.vue'),
            meta: { title: '组件' }
          }
        ]
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    hidden: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
