<template>
  <div class="music-list">
    <!-- 返回的按钮 -->
    <div class="back" @click="back">
      <i class="icon icon-back"></i>
    </div>
    <!-- 标题 -->
    <h1 class="title">周杰伦</h1>
    <!-- 歌手的头像  -->
    <div class="avatar-image"></div>
    <div class="songs"></div>
  </div>
</template>

<script>
export default {
  methods: {
    // 返回到歌手列表
    back() {
      this.$router.push('/singer')
    }
  }
}
</script>


<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mimix.styl'
  .music-list
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    background-color $color-background
    z-index 100
    .back
      position absolute
      top 0
      left 5px
      z-index 50
      .icon-back
        font-size $font-size-large-x
        color $color-theme
        display block
        padding 10px
    .title
      height 42px
      line-height 42px
      text-align center
</style>
