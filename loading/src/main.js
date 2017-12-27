import Vue from 'vue'
import L from './loading.vue'

let LoadingConstructor = Vue.extend(L)
let instance

LoadingConstructor.prototype.hide = function () {
  this.$on('after-leave', _ => {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.$destroy()
  })
  this.visible = false
}

const Loading = options => {
  options = options || {}

  instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  })
  // instance.vm = instance.$mount()
  document.body.appendChild(instance.$el)
  instance.$el.style.zIndex = '10000000'
  Vue.nextTick(_ => {
    instance.visible = true
  })
  return instance
}

export default Loading
