import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/Home.vue'
import GridDelegates from '../views/DelegatesGrid.vue'
import FrmDelegate from '../views/DelegateFrm.vue'
import FrmLogin from '../views/LoginFrm.vue'
import GridDelegatesLog from '../views/DelegatesLogGrid.vue'
import FrmMyPreferences from '../views/MyPreferencesFrm.vue'
import CareGiversOrderValidationGrid from '../views/CareGiversOrderValidationGrid.vue'
import CareGiversOrderValidationFrm from '../views/CareGiversOrderValidationFrm.vue'
import GridMergeField from '../views/MergeFieldGrid.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',                       name: 'home',             component: HomeView },
    { path: '/about',                  name: 'about',            component: () => import('../views/AboutFrm.vue') },
    { path: '/login',                  name: 'FrmLogin',         component: FrmLogin },
    { path: '/delegates',              name: 'GridDelegates',    component: GridDelegates },
    { path: '/delegates/new',          name: 'FrmDelegate',      component: FrmDelegate },
    { path: '/delegates/:delegateId',  name: 'FrmDelegate',      component: FrmDelegate },
    { path: '/delegateslog',           name: 'GridDelegatesLog', component: GridDelegatesLog },
    { path: '/caregivers/ordervalidation',   name: 'CareGiversOrderValidationGrid',   component: CareGiversOrderValidationGrid },
    { path: '/caregivers/ordervalidation/edit/:caregiverId',         name: 'CareGiversOrderValidationFrm',   component: CareGiversOrderValidationFrm },
    { path: '/mypreferences',          name: 'FrmMyPreferences', component: FrmMyPreferences },
    { path: '/mergefield',             name: 'GridMergeField',   component: GridMergeField },
  ]
  })

export default router
