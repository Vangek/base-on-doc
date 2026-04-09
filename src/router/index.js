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
            component: () => import('@/layout/ComponentLayout.vue'),
            children: [
              {
                path: '',
                name: 'ComponentsIndex',
                component: () => import('@/views/components/index.vue'),
              },
              {
                path: 'base-table',
                name: 'BaseTable',
                component: () => import('@/views/components/BaseTable.vue'),
              },
              {
                path: 'base-search',
                name: 'BaseSearch',
                component: () => import('@/views/components/BaseSearch.vue'),
              },
              {
                path: 'base-pagination',
                name: 'BasePagination',
                component: () => import('@/views/components/BasePagination.vue'),
              },
              {
                path: 'base-file-preview',
                name: 'BaseFilePreview',
                component: () => import('@/views/components/BaseFilePreview.vue'),
              },
              {
                path: 'base-form-mini',
                name: 'BaseFormMini',
                component: () => import('@/views/components/BaseFormMini.vue'),
              },
              {
                path: 'base-form-json',
                name: 'BaseFormJson',
                component: () => import('@/views/components/BaseFormJson.vue'),
              },
              {
                path: 'base-cron-select',
                name: 'BaseCronSelect',
                component: () => import('@/views/components/BaseCronSelect.vue'),
              },
              {
                path: ':slug',
                name: 'ComponentDoc',
                component: () => import('@/views/components/index.vue'),
              },
            ],
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
