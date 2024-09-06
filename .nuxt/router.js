import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _10ba9c12 = () => interopDefault(import('..\\pages\\forget-password.vue' /* webpackChunkName: "pages/forget-password" */))
const _3ae52c8d = () => interopDefault(import('..\\pages\\reset-password.vue' /* webpackChunkName: "pages/reset-password" */))
const _1112b990 = () => interopDefault(import('..\\pages\\staff-login.vue' /* webpackChunkName: "pages/staff-login" */))
const _317773fc = () => interopDefault(import('..\\pages\\verify-email.vue' /* webpackChunkName: "pages/verify-email" */))
const _ee5cb776 = () => interopDefault(import('..\\pages\\Modules\\change-password.vue' /* webpackChunkName: "pages/Modules/change-password" */))
const _2669aea6 = () => interopDefault(import('..\\pages\\Modules\\Dashboard\\high-level-management.vue' /* webpackChunkName: "pages/Modules/Dashboard/high-level-management" */))
const _02184611 = () => interopDefault(import('..\\pages\\Modules\\Doctor-Management\\doctor-record.vue' /* webpackChunkName: "pages/Modules/Doctor-Management/doctor-record" */))
const _0cf40c94 = () => interopDefault(import('..\\pages\\Modules\\Doctor-Management\\edit-doctor.vue' /* webpackChunkName: "pages/Modules/Doctor-Management/edit-doctor" */))
const _6cdf48b7 = () => interopDefault(import('..\\pages\\Modules\\Doctor-Management\\new-submission.vue' /* webpackChunkName: "pages/Modules/Doctor-Management/new-submission" */))
const _703e565e = () => interopDefault(import('..\\pages\\Modules\\Setting\\access-control.vue' /* webpackChunkName: "pages/Modules/Setting/access-control" */))
const _5b18721a = () => interopDefault(import('..\\pages\\Modules\\Setting\\roles-setting.vue' /* webpackChunkName: "pages/Modules/Setting/roles-setting" */))
const _e24f41e0 = () => interopDefault(import('..\\pages\\Modules\\Staff-Management\\edit-staff.vue' /* webpackChunkName: "pages/Modules/Staff-Management/edit-staff" */))
const _f384a22e = () => interopDefault(import('..\\pages\\Modules\\Staff-Management\\register-staff.vue' /* webpackChunkName: "pages/Modules/Staff-Management/register-staff" */))
const _d88d835e = () => interopDefault(import('..\\pages\\Modules\\Staff-Management\\staff-record.vue' /* webpackChunkName: "pages/Modules/Staff-Management/staff-record" */))
const _f68af13a = () => interopDefault(import('..\\pages\\Modules\\Staff-Management\\usermatrix-view.vue' /* webpackChunkName: "pages/Modules/Staff-Management/usermatrix-view" */))
const _2d52e464 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _10ba9c12,
    name: "forget-password"
  }, {
    path: "/reset-password",
    component: _3ae52c8d,
    name: "reset-password"
  }, {
    path: "/staff-login",
    component: _1112b990,
    name: "staff-login"
  }, {
    path: "/verify-email",
    component: _317773fc,
    name: "verify-email"
  }, {
    path: "/Modules/change-password",
    component: _ee5cb776,
    name: "Modules-change-password"
  }, {
    path: "/Modules/Dashboard/high-level-management",
    component: _2669aea6,
    name: "Modules-Dashboard-high-level-management"
  }, {
    path: "/Modules/Doctor-Management/doctor-record",
    component: _02184611,
    name: "Modules-Doctor-Management-doctor-record"
  }, {
    path: "/Modules/Doctor-Management/edit-doctor",
    component: _0cf40c94,
    name: "Modules-Doctor-Management-edit-doctor"
  }, {
    path: "/Modules/Doctor-Management/new-submission",
    component: _6cdf48b7,
    name: "Modules-Doctor-Management-new-submission"
  }, {
    path: "/Modules/Setting/access-control",
    component: _703e565e,
    name: "Modules-Setting-access-control"
  }, {
    path: "/Modules/Setting/roles-setting",
    component: _5b18721a,
    name: "Modules-Setting-roles-setting"
  }, {
    path: "/Modules/Staff-Management/edit-staff",
    component: _e24f41e0,
    name: "Modules-Staff-Management-edit-staff"
  }, {
    path: "/Modules/Staff-Management/register-staff",
    component: _f384a22e,
    name: "Modules-Staff-Management-register-staff"
  }, {
    path: "/Modules/Staff-Management/staff-record",
    component: _d88d835e,
    name: "Modules-Staff-Management-staff-record"
  }, {
    path: "/Modules/Staff-Management/usermatrix-view",
    component: _f68af13a,
    name: "Modules-Staff-Management-usermatrix-view"
  }, {
    path: "/",
    component: _2d52e464,
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
