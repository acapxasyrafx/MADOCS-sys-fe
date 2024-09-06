export { default as CommonHeader } from '../../components/CommonHeader.vue'
export { default as CommonSidebar } from '../../components/CommonSidebar.vue'
export { default as Error } from '../../components/Error.vue'
export { default as Home } from '../../components/Home.vue'
export { default as Login } from '../../components/Login.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as Loader } from '../../components/loader.vue'
export { default as AdminToHeader } from '../../components/Admin/Admin_ToHeader.vue'
export { default as AdminAdminsidebar } from '../../components/Admin/Adminsidebar.vue'
export { default as AdminModule1 } from '../../components/Admin/Module1.vue'
export { default as AdminModule2 } from '../../components/Admin/Module2.vue'
export { default as AdminRolesaccess } from '../../components/Admin/rolesaccess.vue'
export { default as AdminRolesmatrix } from '../../components/Admin/rolesmatrix.vue'
export { default as AdminScreenmanagement } from '../../components/Admin/screenmanagement.vue'
export { default as AdminScreenpage } from '../../components/Admin/screenpage.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
