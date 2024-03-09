import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/Home.vue'
import SimilarGrid from '../views/SimilarGrid.vue'
import SimilarFrm from '../views/SimilarFrm.vue'
import FrmLogin from '../views/LoginFrm.vue'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',                                             name: 'SimilarGrid',                   component: SimilarGrid },
    { path: '/home',                                         name: 'home',                          component: HomeView },
    { path: '/login',                                        name: 'FrmLogin',                      component: FrmLogin },
    { path: '/similarity',                                   name: 'SimilarGrid',                   component: SimilarGrid },
    { path: '/similarity/:id',                               name: 'SimilarFrm',                    component: SimilarFrm },
  ]
  })

export default router
