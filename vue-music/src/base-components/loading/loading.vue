<template>
  <div class="loading">
    <img src="./loading.gif" alt="" width="24" height="24">
    <p class="desc">{{desc}}</p>
  </div>
</template>

<script>
export default {
  props: {
    desc: {
      type: String,
      default: '数据加载中...'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.loading
  width 100%
  text-align center
  .desc
    color $color-text-l
    font-size $font-size-small
    line-height 20px
</style>


