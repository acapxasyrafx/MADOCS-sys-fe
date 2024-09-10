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
const _9b889c08 = () => interopDefault(import('..\\pages\\Modules\\Members\\edit-members.vue' /* webpackChunkName: "pages/Modules/Members/edit-members" */))
const _64ffd3aa = () => interopDefault(import('..\\pages\\Modules\\Members\\members-record.vue' /* webpackChunkName: "pages/Modules/Members/members-record" */))
const _bc212294 = () => interopDefault(import('..\\pages\\Modules\\Members\\new-members.vue' /* webpackChunkName: "pages/Modules/Members/new-members" */))
const _da1c25a8 = () => interopDefault(import('..\\pages\\Modules\\Members\\new-request.vue' /* webpackChunkName: "pages/Modules/Members/new-request" */))
const _703e565e = () => interopDefault(import('..\\pages\\Modules\\Setting\\access-control.vue' /* webpackChunkName: "pages/Modules/Setting/access-control" */))
const _5b18721a = () => interopDefault(import('..\\pages\\Modules\\Setting\\roles-setting.vue' /* webpackChunkName: "pages/Modules/Setting/roles-setting" */))
const _e24f41e0 = () => interopDefault(import('..\\pages\\Modules\\Staff-Management\\edit-staff.vue' /* webpackChunkName: "pages/Modules/Staff-Management/edit-staff" */))
const _f384a22e = () => interopDefault(import('..\\pages\\Modules\\Staff-Management\\register-staff.vue' /* webpackChunkName: "pages/Modules/Staff-Management/register-staff" */))
const _d88d835e = () => interopDefault(import('..\\pages\\Modules\\Staff-Management\\staff-record.vue' /* webpackChunkName: "pages/Modules/Staff-Management/staff-record" */))
const _f68af13a = () => interopDefault(import('..\\pages\\Modules\\Staff-Management\\usermatrix-view.vue' /* webpackChunkName: "pages/Modules/Staff-Management/usermatrix-view" */))
const _5ecb76ee = () => interopDefault(import('..\\pages\\static\\js\\apexcharts.min.js' /* webpackChunkName: "pages/static/js/apexcharts.min" */))
const _25e8005e = () => interopDefault(import('..\\pages\\static\\js\\bootstrap.bundle.min.js' /* webpackChunkName: "pages/static/js/bootstrap.bundle.min" */))
const _4cc9a338 = () => interopDefault(import('..\\pages\\static\\js\\datatables-simple-demo.js' /* webpackChunkName: "pages/static/js/datatables-simple-demo" */))
const _5fbe4ac0 = () => interopDefault(import('..\\pages\\static\\js\\dataTables.bootstrap5.min.js' /* webpackChunkName: "pages/static/js/dataTables.bootstrap5.min" */))
const _4e6fdf97 = () => interopDefault(import('..\\pages\\static\\js\\fullcalendar.js' /* webpackChunkName: "pages/static/js/fullcalendar" */))
const _b0237394 = () => interopDefault(import('..\\pages\\static\\js\\jquery-3.5.1.js' /* webpackChunkName: "pages/static/js/jquery-3.5.1" */))
const _7b379647 = () => interopDefault(import('..\\pages\\static\\js\\jquery.dataTables.min.js' /* webpackChunkName: "pages/static/js/jquery.dataTables.min" */))
const _b354495e = () => interopDefault(import('..\\pages\\static\\js\\jquery.richtext.js' /* webpackChunkName: "pages/static/js/jquery.richtext" */))
const _ba917386 = () => interopDefault(import('..\\pages\\static\\js\\jquery.table2excel.min.js' /* webpackChunkName: "pages/static/js/jquery.table2excel.min" */))
const _5f4cdc42 = () => interopDefault(import('..\\pages\\static\\js\\scripts.js' /* webpackChunkName: "pages/static/js/scripts" */))
const _dd70f920 = () => interopDefault(import('..\\pages\\static\\js\\select2.min.js' /* webpackChunkName: "pages/static/js/select2.min" */))
const _2d52e464 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
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
    path: "/Modules/Members/edit-members",
    component: _9b889c08,
    name: "Modules-Members-edit-members"
  }, {
    path: "/Modules/Members/members-record",
    component: _64ffd3aa,
    name: "Modules-Members-members-record"
  }, {
    path: "/Modules/Members/new-members",
    component: _bc212294,
    name: "Modules-Members-new-members"
  }, {
    path: "/Modules/Members/new-request",
    component: _da1c25a8,
    name: "Modules-Members-new-request"
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
    path: "/static/js/apexcharts.min",
    component: _5ecb76ee,
    name: "static-js-apexcharts.min"
  }, {
    path: "/static/js/bootstrap.bundle.min",
    component: _25e8005e,
    name: "static-js-bootstrap.bundle.min"
  }, {
    path: "/static/js/datatables-simple-demo",
    component: _4cc9a338,
    name: "static-js-datatables-simple-demo"
  }, {
    path: "/static/js/dataTables.bootstrap5.min",
    component: _5fbe4ac0,
    name: "static-js-dataTables.bootstrap5.min"
  }, {
    path: "/static/js/fullcalendar",
    component: _4e6fdf97,
    name: "static-js-fullcalendar"
  }, {
    path: "/static/js/jquery-3.5.1",
    component: _b0237394,
    name: "static-js-jquery-3.5.1"
  }, {
    path: "/static/js/jquery.dataTables.min",
    component: _7b379647,
    name: "static-js-jquery.dataTables.min"
  }, {
    path: "/static/js/jquery.richtext",
    component: _b354495e,
    name: "static-js-jquery.richtext"
  }, {
    path: "/static/js/jquery.table2excel.min",
    component: _ba917386,
    name: "static-js-jquery.table2excel.min"
  }, {
    path: "/static/js/scripts",
    component: _5f4cdc42,
    name: "static-js-scripts"
  }, {
    path: "/static/js/select2.min",
    component: _dd70f920,
    name: "static-js-select2.min"
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
