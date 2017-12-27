// 自定义颜色：
// colors = {
//   success: '#2BD99F',
//   warning: '#FF5722',
//   info: '#26B7FF',
//   error: '#FFC107'
// }

// 自定义停留时间
// time = 2 // 2秒

// css 长度单位
// unit = 'px'

class Alert {
  constructor (colors = {
    success: '#2BD99F',
    warning: '#FF5722',
    info: '#26B7FF',
    error: '#FFC107'
  }, time = 2, style = {
    height: '80px',
    fontSize: '20px',
    fontWeight: '600',
    fontFamily: 'weiruanyahei'
  }) {
    this.color = colors
    this.time = time * 1000
    this.style = style
  }
  create () {
    let el = document.createElement('div')
    el.style = `
    position: fixed;
    top: -${this.style.height};
    left: 0;
    z-index: 99999999;
    width: 100%;
    height:${this.style.height};
    text-align: center;
    color: #fff;
    opacity: 0;
    font: ${this.style.fontWeight} ${this.style.fontSize}/${this.style.height} ${this.style.fontFamily};
    transition: all .3s ease-in-out;
    box-shadow: 0 0 18px rgba(0,0,0,.3);`
    return el
  }
  append (el) {
    document.querySelector('body').appendChild(el)
  }
  destroy (el) {
    document.querySelector('body').removeChild(el)
  }
  animation (el) {
    // slide-in
    setTimeout(_ => {
      el.style.top = 0
      el.style.opacity = 1
    }, 20)
    // stay and slide-out
    setTimeout(_ => {
      el.style.top = `-${this.style.height}`
      el.style.opacity = 0
    }, (this.time + 320))
    // destroy
    setTimeout(_ => {
      this.destroy(el)
    }, (this.time + 720))
  }
  init (msg, type) {
    let el = this.create()
    this.append(el)
    el.innerText = msg
    el.style.backgroundColor = this.color[type]
    this.animation(el)
  }
  success (msg) {
    this.init(msg, 'success')
  }
  error (msg) {
    this.init(msg, 'error')
  }
  warning (msg) {
    this.init(msg, 'warning')
  }
  info (msg) {
    this.init(msg, 'info')
  }
}

export { Alert }
