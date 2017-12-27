import Vue from 'vue'

Vue.directive('fold', {
  inserted (el, binding) {
    el.show = binding.value
    el.style.transform = 'translate3d(0,0,0)'
    el.wrap = el.querySelector('.content_wrap')
    el.arrow = el.querySelector('.arrow')
    el.h = el.querySelector('.content').offsetHeight
    el.wrap.style.transition = 'all .3s ease'
    el.arrow.style.transition = 'all .2s ease'
    if (el.show) {
      el.wrap.style.height = el.h + 'px'
      el.wrap.style.overflow = 'auto'
      el.arrow.style.transform = 'rotate(180deg)'
      el.style.borderBottom = 0
    } else {
      el.wrap.style.height = 0
      el.wrap.style.overflow = 'hidden'
      el.arrow.style.transform = 'rotate(0deg)'
      el.style.borderBottom = '0.01rem solid #343434'
    }
    el.show = !el.show
  },
  bind (el, binding, vnode) {
    function handler (e) {
      if (el.show) {
        el.wrap.style.height = el.h + 'px'
        el.wrap.style.overflow = 'auto'
        el.arrow.style.transform = 'rotate(-180deg)'
        el.style.borderBottom = 0
      } else {
        el.wrap.style.height = 0
        el.wrap.style.overflow = 'hidden'
        el.arrow.style.transform = 'rotate(0deg)'
        el.style.borderBottom = '0.01rem solid #343434'
      }
      el.show = !el.show
    }
    el.fold = handler
    el.addEventListener('click', el.fold)
  },
  unbind (el, binding) {
    el.removeEventListener('click', el.fold)
    delete el.fold
  }
})
