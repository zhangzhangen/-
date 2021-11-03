import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Home,
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    alias: '/',
    redirect: '/welcome',
    children: [
      {path:'users',component:()=>import('../views/Users.vue')},
      { path: 'welcome', component: ()=>import('../views/welcome.vue') },
      { path: 'rights', component: ()=>import('../views/rights.vue') },
      { path: 'roles', component: ()=>import('../views/roles.vue') },
      { path: 'categories', component: ()=>import('../views/categories.vue') },
      { path: 'params', component: ()=>import('../views/params.vue') },
      { path: 'goods', component: ()=>import('../views/goods.vue')},
      {path:'/goods/add',component:()=>import('../components/childer/goodadd.vue')},
      { path: 'orders', component: ()=>import('../views/orders.vue') },
      { path: 'file', component: ()=>import('../views/file.vue') },
    ]
  },
  {
    path:'/users',component:()=>import('../views/Users.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  console.log(23123)
  if (to.path === '/login') next()
  if (sessionStorage.getItem('token')) {
      next();
  } else {
      next('/login')
  }
})


export default router
