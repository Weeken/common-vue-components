import show from './src/main.js'
export default {
  install (Vue) {
    Vue.prototype.$loading = show
  },
  show
}
