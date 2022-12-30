import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: 'goods',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: 'goods',
        name: 'Goods',
        meta: {
          isShow: true,
          title: '商品列表'
        },
        component: () => import('@/views/GoodsView.vue')
      },
      {
        path: 'user',
        name: 'User',
        meta: {
          isShow: true,
          title: '用户列表'
        },
        component: () => import('@/views/UserView.vue')
      },
      {
        path: 'role',
        name: 'Role',
        meta: {
          isShow: true,
          title: '角色列表'
        },
        component: () => import('@/views/RoleView.vue')
      },
      {
        path: 'authority',
        name: 'Authority',
        meta: {
          isShow: false,
          title: '权限列表'
        },
        component: () => import('@/views/AuthorityView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem('token')
  if (!token && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
export default router
