<template lang="html">
  <div class="selsector" v-clickoutside="hide" @click="tuggle">
    <div
        type="text"
        ref="input"
        class="input"
        :class="invalid ? errorClass : ''"
        :placeholder="placeholder"
        :value="selectedLabel">{{selectedLabel}}</div>
    <i ref="icon"></i>
    <transition name="options">
      <div class="options" v-if="show">
        <ul ref="ul" v-if="list.length > 0">
          <li v-for="item in list" @click.self="select(item.label, item.value)" :title="item.label">{{item.label}}</li>
        </ul>
        <div class="loading" v-else>
          <i class="spinner"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/*
组件使用说明：
list: <Array> require: true;  例子：[{label:'男', value: 'male'}]
placeholder: <String>; require: false; （defalut:'请选择'）
 */
import clickoutside from '@/utils/clickoutside'
export default {
  name: 'selector',
  props: {
    list: { type: Array, required: true, default: [] },
    errorClass: String,
    value: null,
    placeholder: { type: String, default: '请选择' },
    canClick: { type: Boolean, default: true }
  },
  data () {
    return {
      show: false,
      dirty: false,
      selectedValue: ''
    }
  },
  watch: {
    value (val) {
      this.selectedValue = val
    },
    show (val) {
      this.dirty = true
    },
    selectedValue (val) {
      this.$emit('input', val)
      this.$emit('label-change', val)
    },
    invalid (val) {
      this.$emit('update:invalid', val)
    }
  },
  computed: {
    invalid () { return (this.dirty && !this.show && !this.selectedLabel) },
    selectedLabel () {
      if (this.list.length > 0 && this.value) {
        let label = this.list.find(item => {
          return item.value === this.value
        })
        return label ? label.label : ''
      }
    }
  },
  methods: {
    tuggle () {
      const that = this
      if (!that.canClick) return
      that.show = !that.show
      const arrow = that.$refs.icon
      if (arrow.style.transform.includes('225')) {
        that.arrowDown(arrow)
      } else {
        that.arrowUp(arrow)
      }
    },
    select (label, value) {
      if (!this.canClick) return
      // this.$set(this, 'selectedLabel', label)
      this.$set(this, 'selectedValue', value)
    },

    hide () {
      const that = this
      that.show = false
      that.arrowDown(that.$refs.icon)
    },
    arrowDown (targetArrow) {
      const that = this
      targetArrow.style.transform = 'rotate(45deg)'
      targetArrow.style.zIndex = '5'
    },
    arrowUp (targetArrow) {
      const that = this
      targetArrow.style.transform = 'rotate(225deg)'
      targetArrow.style.zIndex = '100001'
    }
  }
}
</script>

<style lang="less" scoped>
.selsector{
  width: 100%;
  height: 100%;
  position: relative;
  & > i{
    content: '';
    position: absolute;
    top: 40%;
    right: .3rem;
    // z-index: 100001;
    width: .16rem;
    height: .16rem;
    border: 0;
    border-right: .04rem solid #fff;
    border-bottom: .04rem solid #fff;
    transform: rotate(45deg);
    transition: all 0.1s linear;
  }

  & > .input{
    width: 100%;
    height: 100%;
    font-size: .32rem;
    line-height: 1.22rem;
    background-color: #1e1e1e;
    &::placeholder { color: rgba(255,255,255,.1); }
    &:empty:before {
      content: attr(placeholder);
      color: rgba(255,255,255,.1);
    }
  }

  .loading{
    width: 100%;
    height: 1.2rem;
    text-align: center;

    & > .spinner{
      display: inline-block;
      width: 1.2rem;
      height: 1.2rem;
      background-image: url('./Spinner.svg');
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  .options{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100000;
    width: 100%;
    max-height: 5.5rem;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #2e2e2e;
    box-shadow: 0 .02rem .08rem 0 rgba(0, 0, 0, 0.11);

    li{
      width: 100%;
      padding: 0 .28rem;
      font: .32rem / 1rem SourceHanSansCN-Normal;
      cursor: pointer;
      white-space: nowrap;
      color: rgba(255,255,255,.3);
      background-color: #2e2e2e;
    }
  }

  // 过渡效果
  .options-enter-active, .options-leave-active {
    transition: all .2s ease;
    transform-origin: top;
  }
  .options-enter, .options-leave-active {
    opacity: 0;
    transform: scaleY(.1);
  }
}
</style>
