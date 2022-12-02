import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GridDelegates from '../views/GridDelegates.vue'
import FrmDelegate from '../views/FrmDelegate.vue'
import FrmLogin from '../views/FrmLogin.vue'
import GridDelegatesLog from '../views/GridDelegatesLog.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',                       name: 'home',             component: HomeView },
    { path: '/about',                  name: 'about',            component: () => import('../views/AboutView.vue') },
    { path: '/login',                  name: 'FrmLogin',         component: FrmLogin },
    { path: '/delegates',              name: 'GridDelegates',    component: GridDelegates },
    { path: '/delegates/new',          name: 'FrmDelegate',      component: FrmDelegate },
    { path: '/delegates/:delegateId',  name: 'FrmDelegate',      component: FrmDelegate },
    { path: '/delegateslog',           name: 'GridDelegatesLog', component: GridDelegatesLog },
  ]
  })

export default router
