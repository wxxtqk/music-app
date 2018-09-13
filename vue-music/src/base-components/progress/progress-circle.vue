<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle r="50" cx="50" cy="50" class="progress-back" fill="transparent"></circle>
      <circle r="50" cx="50" cy="50" class="progress-bar" fill="transparent" :stroke-dasharray="strokeDasharray" :stroke-dashoffset="strokeDashoffset"></circle>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    strokeDasharray() {
      return Math.PI * 100
    },
    strokeDashoffset() {
      return (1 - this.percent) * this.strokeDasharray
    }
  }
}
</script>


<style lang="stylus" scoped>
@import "~common/stylus/variable"
.progress-circle
  position relative
  circle
    stroke-width 8px
    transform-origin center
    &.progress-back
      transform scale(0.9)
      stroke $color-theme-d
    &.progress-bar
      stroke $color-theme
      transform scale(0.9) rotate(-90deg)
</style>
