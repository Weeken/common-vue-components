<template lang="html">
  <div class="w_toast">
    <transition name="slide-fade">
      <div class="box" v-if="visible">
        <div class="icon" :class="type"></div>
        <div class="content">{{message}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'toast',
  data () {
    return {
      visible: false,
      type: 'success',
      message: '',
      autoClose: null
    }
  },
  created () {
    setTimeout(_ => {
      this.visible = true
    }, 50)
    setTimeout(_ => {
      this.visible = false
    }, 2000)
    setTimeout(_ => {
      this.autoClose()
    }, 2500)
  }
}
</script>

<style lang="css" scoped>
.w_toast{
  width: 100%;
  position: fixed;
  bottom: 15%;
  left: 0;
  text-align: center;
}

.w_toast .box{
  display: inline-block;
  max-width: 95%;
  border-radius: .28rem;
  padding: .1rem .3rem .1rem .2rem;
  background-color: #fff;
  overflow: hidden;
}

.w_toast .box .icon{
  display: inline-block;
  vertical-align: middle;
  width: .5rem;
  height: .5rem;
  background-repeat: no-repeat;
  background-size: cover;
}
.w_toast .box .icon.success{
  background-image: url('icons/success.svg');
}
.w_toast .box .icon.error{
  background-image: url('icons/error.svg');
}
.w_toast .box .icon.warning{
  background-image: url('icons/warning.png');
}
.w_toast .box .icon.info{
  background-image: url('icons/info.svg');
}

.w_toast .box .content{
  display: inline-block;
  vertical-align: middle;
  font: .3rem/2 PingFangSC-Regular;
  color: #333;
}

/*过渡效果*/
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translate3d(0, 2rem, 0);
  opacity: 0;
}
</style>
