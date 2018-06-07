<template>
  <!-- 进度条容器 -->
  <div class="progress-bar">
    <!-- 进度条容器 整个进度条-->
    <div class="bar-inner" ref="barInner">
      <!-- 进度条 走过的位置-->
      <div class="progress" ref="progress"></div>
      <!-- 进度条按钮 -->
      <div class="progress-bar-btn" ref="progressBtn">
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
      this.$refs.progress.style.width = `${offset}px` // s设置进度条
      this.$refs.progressBtn.style[prefixStyle('transform')] = `translate3d(${offset}px, 0, 0)` // 设置按钮
    }
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

