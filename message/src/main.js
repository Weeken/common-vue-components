import Vue from 'vue'
import M from './message.vue'

let MessageConstructor = Vue.extend(M)

const Message = function (options) {
  let instance
  options = options || {}
  if (typeof options === 'string') {
    options = { message: options }
  }

  options.onClose = (onCloseCB) => {
    document.body.removeChild(instance.vm.$el)
    onCloseCB()
  }

  options.autoClose = _ => {
    document.body.removeChild(instance.vm.$el)
  }

  instance = new MessageConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.dom = instance.vm.$el
  instance.dom.style.zIndex = '10000000'
  return instance.vm
}

Message.message = options => {
  if (typeof options === 'string') {
    options = { title: options }
  }
  options.type = 'message'
  return Message(options)
}

Message.alert = options => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  options.type = 'alert'
  return Message(options)
}

Message.confirm = options => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  options.type = 'confirm'
  return Message(options)
}

export default Message
