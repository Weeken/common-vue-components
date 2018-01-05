import Vue from 'vue'

Vue.directive('swiping', {
  inserted (el, binding) {
    el.curIndex = 0
    el.inited = false
    el.left = 0
  },
  componentUpdated (el, binding) {
    function addPointer (parent) {
      let pointer = document.createElement('i')
      pointer.className = 'pointer'
      parent.appendChild(pointer)
    }
    if (!el.inited) {
      el.wrap = el.children[0]
      if (el.children[1]) el.pointerWrap = el.children[1]
      el.items = Array.from(el.children[0].children)
      el.itemLength = el.items.length
      el.wrap.style.width = el.offsetWidth * el.itemLength + 'px'
      el.items.map(item => {
        item.style.float = 'left'
        item.style.width = el.offsetWidth + 'px'
        if (el.pointerWrap) {
          addPointer(el.pointerWrap)
        }
      })
      if (el.pointerWrap) {
        el.pointers = Array.from(el.children[1].children)
        if (el.pointers.length > 0) {
          el.pointers[el.curIndex].className = 'pointer active'
        }
        el.inited = true
      }
    }
  },
  bind (el, binding) {
    function doTranslate (ele, origin, offset) {
      ele.style.webkitTransition = ''
      ele.style.webkitTransform = `translate3d(${origin + offset}px, 0, 0)`
    }
    function animation (ele, distance, time, effect = 'ease-in-out') {
      ele.style.webkitTransition = `all ${time}ms ${effect}`
      ele.style.webkitTransform = `translate3d(${distance}px, 0, 0)`
    }
    function doAnimate (offsetLeft) {
      let distanceX = Math.abs(offsetLeft)
      if (el.towards === 'next') {
        // 如果滑动距离大于元素的4分之一，则下一页，否则，回弹
        if (distanceX > (el.dragState.pageWidth * 0.26)) {
          el.curIndex += 1
          el.left -= el.dragState.pageWidth
          animation(el.wrap, el.left, 140)
        } else {
          animation(el.wrap, el.left, 140)
        }
      }
      if (el.towards === 'prev') {
        if (distanceX > (el.dragState.pageWidth * 0.26)) {
          el.curIndex -= 1
          el.left += el.dragState.pageWidth
          animation(el.wrap, el.left, 140)
        } else {
          animation(el.wrap, el.left, 140)
        }
      }
      if (el.towards === 'leftEnd' || el.towards === 'rightEnd') {
        animation(el.wrap, el.left, 240, 'ease')
      }

      el.pointers.map(item => {
        item.className = 'pointer'
      })
      el.pointers[el.curIndex].className = 'pointer active'
    }
    el.touchStart = function (e) {
      // console.log(e)
      let touch = e.touches[0]
      el.dragState = {
        startTime: new Date(), // 开始时间
        startLeft: touch.pageX, // 开始的X坐标
        startTop: touch.pageY, // 开始的Y坐标(相对于整个页面viewport pageY)
        startTopAbsolute: touch.clientY, // 绝对Y坐标(相对于文档顶部 clientY)
        pageWidth: el.offsetWidth, // 一个页面宽度
        pageHeight: el.offsetHeight // 一个页面的高度
      }
      // console.log(el.dragState)
    }
    el.touchMove = function (e) {
      let touch = e.touches[0]
      el.dragState.currentLeft = touch.pageX  // 开始滑动的X坐标
      el.dragState.currentTop = touch.pageY  // 开始滑动的Y坐标(相对于整个页面viewport pageY)
      el.dragState.currentTopAbsolute = touch.clientY  // 绝对Y坐标(相对于文档顶部 clientY)

      // 滑动的水平位移（offsetLeft = currentLeft - startLeft）

      // 滑动的垂直位移（offsetTop = currentTopAbsolute - startTopAbsolute）

      // 是否是用户的自然滚动，这里的自然滚动说的是用户并不是想滑动swiper，而是想滑动页面

      let offsetLeft = el.dragState.currentLeft - el.dragState.startLeft
      let offsetTop = el.dragState.currentTopAbsolute - el.dragState.startTopAbsolute

      let distanceX = Math.abs(offsetLeft)
      let distanceY = Math.abs(offsetTop)
      let dragDuration = new Date() - el.dragState.startTime

      // 判断左右滑动还是上下滚动
      if (distanceX < 5 || (distanceY >= 5 && distanceY >= 1.73 * distanceX)) {
        return
      } else {
        e.preventDefault()
      }
      // 滑动距离
      offsetLeft = Math.min(Math.max(-el.dragState.pageWidth + 1, offsetLeft), el.dragState.pageWidth - 1)

      // console.log(offsetLeft)
      // 判断是左移还是右移（offsetLeft < 0 左移，反之，右移）
      // 如果事件间隔小于300ms但是滑出屏幕，直接返回
      if (dragDuration < 300 && el.dragState.currentLeft === undefined) return
      // 如果事件间隔小于300ms 或者 滑动位移超过屏幕宽度 1/2， 根据位移判断方向
      if (dragDuration < 300 || Math.abs(offsetLeft) > el.dragState.pageWidth / 2) {
        el.towards = offsetLeft < 0 ? 'next' : 'prev'
      }
      // 以下情况不移动，两边回弹
      if (el.curIndex === 0 && el.towards === 'prev') {
        el.towards = 'leftEnd'
      }
      if (el.curIndex === el.itemLength - 1 && el.towards === 'next') {
        el.towards = 'rightEnd'
      }
      // 只有一个就。。
      if (el.itemLength < 2) {
        el.towards = null
      }
      // 更换动画需改这里以及animate方法

      doTranslate(el.wrap, el.left, offsetLeft)
    }
    el.touchEnd = function (e) {
      let dragDuration = new Date() - el.dragState.startTime
      let towards = null

      let offsetLeft = el.dragState.currentLeft - el.dragState.startLeft
      let offsetTop = el.dragState.currentTop - el.dragState.startTop
      let pageWidth = el.dragState.pageWidth

      // 时间,距离太短就认为是tap
      if (dragDuration < 300) {
        let fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop < 5)
        if (isNaN(offsetLeft) || isNaN(offsetTop)) {
          fireTap = true
        }
        if (fireTap) {
          console.log('tap')
          return
        }
      }
      // 自动居中
      doAnimate(offsetLeft)

      // console.log(el.curIndex)
      el.dragState = {}
    }
    el.addEventListener('touchstart', el.touchStart)
    el.addEventListener('touchmove', el.touchMove)
    el.addEventListener('touchend', el.touchEnd)
  },
  unbind (el, binding) {
    el.removeEventListener('touchstart', el.touchStart)
    el.removeEventListener('touchmove', el.touchMove)
    el.removeEventListener('touchend', el.touchEnd)
    delete el.touchStart
    delete el.touchMove
    delete el.touchEnd
  }
})
