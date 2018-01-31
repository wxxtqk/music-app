<template>
  <div class="slider" ref="slider">
    <div class="slider-list" ref="sliderList">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active:currentPage === index}"></span>
    </div>
  </div>
</template>

<script>
import {addClass} from '@/utils/addClass'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      dots: [],
      currentPage: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted () {
    this.update()
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setWidth(isResize) {
      this.childrens = this.$refs.sliderList.children
      let width = 0
      let wrapWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.childrens.length; i++) {
        let el = this.childrens[i]
        addClass(el, 'slider-item')
        el.style.width = wrapWidth + 'px' // 每个子元素的宽度等于父元素的宽度
        width += wrapWidth
      }
      if (this.loop && !isResize) {
        this.dots = new Array(this.childrens.length)
        width += 2 * wrapWidth
      }
      this.$refs.sliderList.style.width = width + 'px'
    },
    _setSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollY: false,
        scrollX: true,
        momentum: false,
        snap: {
          loop: true,
          threshold: 0.3,
          speed: 400
        },
        click: true,
        bounce: false
      })
      // 轮播完后
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPage = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      })
    },
    init() {
      this._setWidth()
      this._setSlider()
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    update() {
      // 如果better-scroll存在 先解除
      if (this.slider) {
        this.slider.destroy()
      }
      this.$nextTick(() => {
        this.init()
      })
      // 如果是循环播放
      if (this.autoPlay) {
        this._play()
      }
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.slider 
  min-height 1px
  max-height 150px
  .slider-list 
    position relative
    overflow hidden
    white-space nowrap
    height 100%
    .slider-item
      float left
      overflow hidden
      text-align center
      box-sizing border-box
      height 100%
      a
        display block
        width 100%
        height 100%
        overflow hidden
        text-decoration none 
      img
        display block
        width 100%
        height 100%
  .dots
    position absolute
    right 0
    left 0
    bottom 12px
    text-align center
    font-size 0
    .dot
      display inline-block
      margin 0 4px
      width 8px
      height 8px
      border-radius 50%
      background $color-text-l
      &.active
        width 20px
        border-radius 5px
        background: $color-text-ll
</style>
