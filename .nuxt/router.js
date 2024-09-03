import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _10ba9c12 = () => interopDefault(import('..\\pages\\forget-password.vue' /* webpackChunkName: "pages/forget-password" */))
const _3ae52c8d = () => interopDefault(import('..\\pages\\reset-password.vue' /* webpackChunkName: "pages/reset-password" */))
const _1112b990 = () => interopDefault(import('..\\pages\\staff-login.vue' /* webpackChunkName: "pages/staff-login" */))
const _99a85412 = () => interopDefault(import('..\\pages\\user-registration.vue' /* webpackChunkName: "pages/user-registration" */))
const _317773fc = () => interopDefault(import('..\\pages\\verify-email.vue' /* webpackChunkName: "pages/verify-email" */))
const _ee5cb776 = () => interopDefault(import('..\\pages\\Modules\\change-password.vue' /* webpackChunkName: "pages/Modules/change-password" */))
const _2669aea6 = () => interopDefault(import('..\\pages\\Modules\\Dashboard\\high-level-management.vue' /* webpackChunkName: "pages/Modules/Dashboard/high-level-management" */))
const _817dd56a = () => interopDefault(import('..\\pages\\Modules\\Inventory\\inventory-record.vue' /* webpackChunkName: "pages/Modules/Inventory/inventory-record" */))
const _436914df = () => interopDefault(import('..\\pages\\Modules\\Inventory\\item-category.vue' /* webpackChunkName: "pages/Modules/Inventory/item-category" */))
const _78d2c47a = () => interopDefault(import('..\\pages\\Modules\\Sales-Report\\monthly-group-report.vue' /* webpackChunkName: "pages/Modules/Sales-Report/monthly-group-report" */))
const _73aa7c6c = () => interopDefault(import('..\\pages\\Modules\\Sales-Report\\monthly-report.vue' /* webpackChunkName: "pages/Modules/Sales-Report/monthly-report" */))
const _7331c7e2 = () => interopDefault(import('..\\pages\\Modules\\Sales-Report\\yearly-report.vue' /* webpackChunkName: "pages/Modules/Sales-Report/yearly-report" */))
const _19b8de75 = () => interopDefault(import('..\\pages\\Modules\\Sales\\chart-account.vue' /* webpackChunkName: "pages/Modules/Sales/chart-account" */))
const _1830ab3c = () => interopDefault(import('..\\pages\\Modules\\Sales\\edit-sales.vue' /* webpackChunkName: "pages/Modules/Sales/edit-sales" */))
const _f53b567c = () => interopDefault(import('..\\pages\\Modules\\Sales\\ledger.vue' /* webpackChunkName: "pages/Modules/Sales/ledger" */))
const _f0d09654 = () => interopDefault(import('..\\pages\\Modules\\Sales\\new-sales.vue' /* webpackChunkName: "pages/Modules/Sales/new-sales" */))
const _01a723d4 = () => interopDefault(import('..\\pages\\Modules\\Sales\\sales-transaction.vue' /* webpackChunkName: "pages/Modules/Sales/sales-transaction" */))
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
    path: "/user-registration",
    component: _99a85412,
    name: "user-registration"
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
    path: "/Modules/Inventory/inventory-record",
    component: _817dd56a,
    name: "Modules-Inventory-inventory-record"
  }, {
    path: "/Modules/Inventory/item-category",
    component: _436914df,
    name: "Modules-Inventory-item-category"
  }, {
    path: "/Modules/Sales-Report/monthly-group-report",
    component: _78d2c47a,
    name: "Modules-Sales-Report-monthly-group-report"
  }, {
    path: "/Modules/Sales-Report/monthly-report",
    component: _73aa7c6c,
    name: "Modules-Sales-Report-monthly-report"
  }, {
    path: "/Modules/Sales-Report/yearly-report",
    component: _7331c7e2,
    name: "Modules-Sales-Report-yearly-report"
  }, {
    path: "/Modules/Sales/chart-account",
    component: _19b8de75,
    name: "Modules-Sales-chart-account"
  }, {
    path: "/Modules/Sales/edit-sales",
    component: _1830ab3c,
    name: "Modules-Sales-edit-sales"
  }, {
    path: "/Modules/Sales/ledger",
    component: _f53b567c,
    name: "Modules-Sales-ledger"
  }, {
    path: "/Modules/Sales/new-sales",
    component: _f0d09654,
    name: "Modules-Sales-new-sales"
  }, {
    path: "/Modules/Sales/sales-transaction",
    component: _01a723d4,
    name: "Modules-Sales-sales-transaction"
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
