<template lang="html">
  <div class="w-folder" v-fold="initOpen">
    <div class="w-title">
      <slot name="title"></slot>
      <i class="arrow"></i>
    </div>
    <div class="content_wrap">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import fold from './fold'
export default {
  name: 'folder',
  props: {
    initOpen: {type: Boolean, default: false}
  }
}
</script>

<style lang="less" scoped>
.w-folder{
  width: 100%;

  &:last-child{
    border-bottom: 0 !important;
  }

  .w-title{
    width: 100%;
    height: 100%;
    position: relative;

    .arrow {
      position: absolute;
      top: 40%;
      right: .3rem;
      width: 0.2rem;
      height: 0.2rem;
      transition: transform .1s linear;
      cursor:pointer;
      background-image: url('./arrow.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;
    }
  }
}
</style>
