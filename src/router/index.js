import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/product/:id',
        name: '產品頁面',
        component: () => import('../views/Product.vue')
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../views/Cart.vue')
      }
    ]
  },
  // 巢狀路由
  {
    path: '/login',
    component: () => import('../views/dashboard/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/Orders.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: '優惠券',
        component: () => import('../views/dashboard/Coupons.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'Storages',
        name: '圖片頁面',
        component: () => import('../views/dashboard/Storages.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
