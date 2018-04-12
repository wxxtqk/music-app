<template>
  <div class="my-header">
    <div class="icon"></div>
    <div class="text">Chicken Music</div>
    <div class="mine">
      <i class="icon-mine"></i>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mimix"
  .my-header
    text-align center
    font-size 0
    position relative
    height 44px
    color $color-theme
    .icon
      width 30px
      display inline-block
      height 32px
      bg-image('logo')
      background-repeat no-repeat
      background-size 30px 32px
      margin-top 5px
      margin-right 9px
      vertical-align top
    .text
      font-size $font-size-large
      display inline-block
      vertical-align top
      line-height 44px
    .mine
      position absolute
      right 0
      top 0
      .icon-mine
        display block
        font-size 20px 
        padding 12px
        color $color-theme
</style>



