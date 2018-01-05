<template lang="html">
  <div class="w-swiper-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'swiperItem'
}
</script>

<style lang="less" scoped>
.w-swiper-item{
	width: 100%;
	height: 100%;
}
</style>
