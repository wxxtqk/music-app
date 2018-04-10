<template>
  <transition name="detail">
    <div class="singer-detail"></div>
  </transition>
</template>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.singer-detail
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  z-index 100
  background-color $color-background
.detail-enter-active, .detail-leave-active
  transition all .3s
.detail-enter, .detail-leave-to
  transform translate3d(100%, 0, 0)

</style>

