<template lang="html">
  <div class="w_alert">
    <transition name="fade">
      <div class="mask" v-if="visible">
        <transition name="bounce">
          <div class="box" v-if="showMessage">
            <div class="title">{{title}}</div>
            <div class="content">{{message}}</div>
            <div class="alert" v-if="type === 'alert'" @click="close(onCloseCB)">{{button}}</div>
            <div class="confirm" v-if="type === 'confirm'">
              <div class="no" @click="close(confirmCB.cancel)">取消</div>
              <div class="yes" @click="close(confirmCB.confirm)">确定</div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'message',
  data () {
    return {
      visible: false,
      type: 'alert',
      showMessage: false,
      title: '提示',
      message: ' ',
      button: '确定',
      autoClose: null,
      onClose: null,
      onCloseCB: null,
      confirmCB: {
        cancel () {},
        confirm () {}
      }
    }
  },
  methods: {
    close (cb) {
      if (typeof this.onClose === 'function') {
        this.showMessage = false
        setTimeout(_ => {
          this.visible = false
          this.onClose(cb)
        }, 200)
      }
    }
  },
  created () {
    setTimeout(_ => {
      this.visible = true
    }, 5)
    setTimeout(_ => {
      this.showMessage = true
    }, 10)
    if (this.type === 'message') {
      setTimeout(_ => {
        this.showMessage = false
      }, 1400)
      setTimeout(_ => {
        this.visible = false
        this.autoClose()
      }, 1600)
    }
  }
}
</script>

<style lang="css" scoped>
.w_alert{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

.w_alert .mask{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.76);
}

.w_alert .mask .box{
  width: 70%;
  border-radius: .28rem;
  position: absolute;
  top: 30%;
  left: 50%;
  /*transform: translateX(-50%);*/
  margin-left: -35%;
  /*margin-top: -*/
  background-color: #fff;
  text-align: center;
}

.w_alert .mask .box .title{
  font: 500 .36rem/1 PingFangSC-Regular;
  /*margin-bottom: 20px;*/
  padding: .4rem .5rem .24rem;
  color: #000;
}

.w_alert .mask .box .content{
  font: .3rem/1.5 PingFangSC-Regular;
  /*margin-bottom: 20px;*/
  color: #888;
  padding: 0 .55rem .34rem;
}

.w_alert .mask .box .alert{
  font: .36rem/1rem PingFangSC-Regular;
  color: #02BB00;
  border-top: .01rem solid #e5e5e5;
}

.w_alert .mask .box .confirm{
  display: flex;
  font: .36rem/1rem PingFangSC-Regular;
  border-top: .01rem solid #e5e5e5;
}

.w_alert .mask .box .confirm .yes,
.w_alert .mask .box .confirm .no{
  flex: 1;
  text-align: center;
}

.w_alert .mask .box .confirm .yes{
  color: #02BB00;
  border-left: .01rem solid #e5e5e5;
}

.w_alert .mask .box .confirm .no{
  color: red;
}

/*过渡效果*/
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.bounce-enter-active {
  animation: bounce-in .2s;
}
.bounce-leave-active {
  animation: bounce-out .2s;
}
@keyframes bounce-in {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
@keyframes bounce-out {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(0); }
}
</style>
