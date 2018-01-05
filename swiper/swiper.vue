<template lang="html">
  <div class="w-swiper" v-swiping>
    <div class="item_wrap">
      <slot></slot>
    </div>
    <div class="pointer_wrap" :style="{bottom: paginationBottom + '%'}" v-if="pagination"></div>
  </div>
</template>

<script>
import swiping from './swiping'
export default {
  name: 'swiper',
  props: {
    pagination: {type: Boolean, default: true},
    paginationBottom: {type: Number, default: 10}
  }
}
</script>

<style lang="less">
.w-swiper{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .item_wrap{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

  .pointer_wrap{
    position: absolute;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: .2rem;
    text-align: center;

    .pointer{
      display: inline-block;
      width: .2rem;
      height: .2rem;
      margin: 0 .06rem;
      border-radius: 50%;
      background-color: #fff;
      opacity: .4;
      vertical-align: middle;
      transition: all .2s ease;

      &.active{
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }
}
</style>
