import Folder from './folder.vue'

/* istanbul ignore next */
Folder.install = function (Vue) {
  Vue.component(Folder.name, Folder)
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Folder)
}

export default Folder
