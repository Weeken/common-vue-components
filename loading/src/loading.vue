<template lang="html">
  <transition name="fade" @after-leave="handleAfterLeave">
    <div class="w_loading" v-show="visible">
      <div class="mask">
        <div class="loading"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
      visible: true
    }
  },
  methods: {
    handleAfterLeave () {
      this.$emit('after-leave')
    }
  }
}
</script>

<style lang="css" scoped>
.w_loading{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0
}

.w_loading .mask{
  width: 100%;
  height: 100%;
}

.w_loading .mask .loading{
  width: 1.6rem;
  height: 1.6rem;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  background: rgba(255,255,255,.2);
  border-radius: 0.3rem;
  box-shadow: 0.02rem 0.02rem 0.2rem rgba(0,0,0,.4);
}

.w_loading .mask .loading:after{
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1rem;
  height: 1rem;
  transform: translate(-48%, -50%);
  background-image: url('../../../../images/flash-logo-gif.gif');
  background-repeat: no-repeat;
  background-size: cover;
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
