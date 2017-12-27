import Vue from 'vue'
import T from './toast.vue'

let ToastConstructor = Vue.extend(T)
let types = ['success', 'error', 'warning', 'info']

const Toast = function (options) {
  let instance
  options = options || {}
  if (typeof options === 'string') {
    options = { message: options }
  }

  options.autoClose = _ => {
    document.body.removeChild(instance.vm.$el)
  }

  instance = new ToastConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.dom = instance.vm.$el
  instance.dom.style.zIndex = '10000000'
  return instance.vm
}

types.map(type => {
  Toast[type] = options => {
    if (typeof options === 'string') {
      options = { message: options }
    }
    options.type = type
    return Toast(options)
  }
})

export default Toast
