import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _359fb11b = () => interopDefault(import('../pages/forget-password.vue' /* webpackChunkName: "pages/forget-password" */))
const _e10c8e2e = () => interopDefault(import('../pages/reset-password.vue' /* webpackChunkName: "pages/reset-password" */))
const _dc0e5748 = () => interopDefault(import('../pages/staff-login.vue' /* webpackChunkName: "pages/staff-login" */))
const _31893150 = () => interopDefault(import('../pages/verify-email.vue' /* webpackChunkName: "pages/verify-email" */))
const _4c27e4e0 = () => interopDefault(import('../pages/Modules/change-password.vue' /* webpackChunkName: "pages/Modules/change-password" */))
const _71376914 = () => interopDefault(import('../pages/Modules/Dashboard/high-level-management.vue' /* webpackChunkName: "pages/Modules/Dashboard/high-level-management" */))
const _6dfc95d9 = () => interopDefault(import('../pages/Modules/Doctor-Management/doctor-record.vue' /* webpackChunkName: "pages/Modules/Doctor-Management/doctor-record" */))
const _b87b442a = () => interopDefault(import('../pages/Modules/Setting/access-control.vue' /* webpackChunkName: "pages/Modules/Setting/access-control" */))
const _2be09ace = () => interopDefault(import('../pages/Modules/Setting/roles-setting.vue' /* webpackChunkName: "pages/Modules/Setting/roles-setting" */))
const _2d5952b4 = () => interopDefault(import('../pages/Modules/Staff-Management/edit-staff.vue' /* webpackChunkName: "pages/Modules/Staff-Management/edit-staff" */))
const _4e14308d = () => interopDefault(import('../pages/Modules/Staff-Management/register-staff.vue' /* webpackChunkName: "pages/Modules/Staff-Management/register-staff" */))
const _d4684e16 = () => interopDefault(import('../pages/Modules/Staff-Management/staff-record.vue' /* webpackChunkName: "pages/Modules/Staff-Management/staff-record" */))
const _90978b82 = () => interopDefault(import('../pages/Modules/Staff-Management/usermatrix-view.vue' /* webpackChunkName: "pages/Modules/Staff-Management/usermatrix-view" */))
const _590d69f2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/app/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/forget-password",
    component: _359fb11b,
    name: "forget-password"
  }, {
    path: "/reset-password",
    component: _e10c8e2e,
    name: "reset-password"
  }, {
    path: "/staff-login",
    component: _dc0e5748,
    name: "staff-login"
  }, {
    path: "/verify-email",
    component: _31893150,
    name: "verify-email"
  }, {
    path: "/Modules/change-password",
    component: _4c27e4e0,
    name: "Modules-change-password"
  }, {
    path: "/Modules/Dashboard/high-level-management",
    component: _71376914,
    name: "Modules-Dashboard-high-level-management"
  }, {
    path: "/Modules/Doctor-Management/doctor-record",
    component: _6dfc95d9,
    name: "Modules-Doctor-Management-doctor-record"
  }, {
    path: "/Modules/Setting/access-control",
    component: _b87b442a,
    name: "Modules-Setting-access-control"
  }, {
    path: "/Modules/Setting/roles-setting",
    component: _2be09ace,
    name: "Modules-Setting-roles-setting"
  }, {
    path: "/Modules/Staff-Management/edit-staff",
    component: _2d5952b4,
    name: "Modules-Staff-Management-edit-staff"
  }, {
    path: "/Modules/Staff-Management/register-staff",
    component: _4e14308d,
    name: "Modules-Staff-Management-register-staff"
  }, {
    path: "/Modules/Staff-Management/staff-record",
    component: _d4684e16,
    name: "Modules-Staff-Management-staff-record"
  }, {
    path: "/Modules/Staff-Management/usermatrix-view",
    component: _90978b82,
    name: "Modules-Staff-Management-usermatrix-view"
  }, {
    path: "/",
    component: _590d69f2,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
