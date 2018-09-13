<template>
  <!-- 进度条容器 -->
  <div class="progress-bar"  @click="hanleCheck">
    <!-- 进度条容器 整个进度条-->
    <div class="bar-inner" ref="barInner">
      <!-- 进度条 走过的位置-->
      <div class="progress" ref="progress"></div>
      <!-- 进度条按钮 小球-->
      <div class="progress-bar-btn" ref="progressBtn" 
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
        >
        <div class="btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import prefixStyle from '@/utils/prefixStyle'
const progressBtn = 16 // 按钮的宽度
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newPercent) {
      let width = this.$refs.barInner.clientWidth - progressBtn // 设置进度条的宽度
      let offset = width * newPercent
      // 防止拖动过程中的歌曲播放而导致的这种偏移量
      if (this.touch.touchState) {
        return
      }
      this._setOffset(offset)
    }
  },
  methods: {
    progressTouchStart(e) {
      this.touch.touchState = true
      // 记录进度条的宽度
      this.touch.left = this.$refs.progress.clientWidth
      // 记录点击时候的手指离左边的距离
      this.touch.startX = e.touches[0].pageX
    },
    progressTouchMove(e) {
      // 只有是经过点击后拖动的才有效果
      if (!this.touch.touchState) {
        return
      }
      // 手指滑动了多远
      let dist = e.touches[0].pageX - this.touch.startX
      // 设置滚动条的偏移量
      // 不能够超过滚动条容器的宽度
      let offset = Math.min(this.$refs.barInner.clientWidth - progressBtn, Math.max(0, dist + this.touch.left))
      this._setOffset(offset)
    },
    progressTouchEnd() {
      this.touch.touchState = false
      this.progressPercent()
    },
    // 派发事件设置歌曲的时间进度
    progressPercent() {
      let containerWidth = this.$refs.barInner.clientWidth - progressBtn
      let width = this.$refs.progress.clientWidth
      this.$emit('progressPercent', width / containerWidth)
    },
    _setOffset(offset) {
      this.$refs.progress.style.width = `${offset}px` // s设置进度条
      this.$refs.progressBtn.style[prefixStyle('transform')] = `translate3d(${offset}px, 0, 0)` // 设置按钮
    },
    hanleCheck(e) {
      let offsetX = e.offsetX
      this._setOffset(offsetX)
      this.progressPercent()
    }
  },
  created () {
    // 记录点击-拖动保存的对象
    this.touch = {}
  }
}
</script>

<style lang="stylus" scoped>
 @import "~common/stylus/variable"
.progress-bar
  height 30px
  padding 0 2px
  .bar-inner
    position relative
    top 13px
    height 4px
    background rgba(0, 0, 0, .3)
    .progress
      height 100%
      background $color-theme
      position absolute
    .progress-bar-btn
      position absolute
      width 30px
      height 30px
      left -8px
      top -13px
      .btn
        position relative
        width 16px
        height 16px
        left 7px
        top 7px
        border-radius 50%
        box-sizing border-box
        border 3px solid $color-text
        background $color-theme
</style>

