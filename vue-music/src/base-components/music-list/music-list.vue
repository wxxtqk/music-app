<template>
  <div class="music-list">
    <!-- 返回的按钮 -->
    <div class="back" @click="back">
      <i class="icon icon-back"></i>
    </div>
    <!-- 标题 -->
    <h1 class="title" v-html="title"></h1>
    <!-- 歌手的头像  -->
    <div class="avatar-image" v-bind:style="bgStyle" ref="avatar">
      <div class="filter"></div>
    </div>
    <!-- 滚动层 -->
    <div class="layer" ref="layer"></div>
    <scroll :data="songs" class="list" ref="list" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
      <div>
        <song-list class="song-list-wrapper" :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from '@/base-components/scroll/scroll'
import songList from '@/base-components/song-list/song-list'
const OFFSET = 42 // 设置偏移量，防止滚动到头部把back按钮挡住了
export default {
  props: {
    avatar: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      probeType: 3,
      listenScroll: true,
      scrollY: 0
    }
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.avatar})`
    }
  },
  mounted () {
    // 获取用户头像的高度
    this.avatarHeight = this.$refs.avatar.clientHeight
    this.mixScrollY = -this.avatarHeight + OFFSET
    // 设置滚动区域父级的top值
    this.$refs.list.$el.style.top = `${this.avatarHeight}px`
  },
  methods: {
    // 返回到歌手列表
    back() {
      this.$router.push('/singer')
    },
    scroll(pos) {
      // 获取滚动的y轴的距离
      this.scrollY = pos.y
    }
  },
  watch: {
    scrollY(newVal) {
      // 设置最大偏移量
      let newScrollY = Math.max(newVal, this.mixScrollY)
      let zIndex = 0
      // 监听滚动的位置，给layer设置偏移量
      this.$refs.layer.style['transform'] = `translate3d(0,${newScrollY}px,0)`
      // 当滚动的内容还没有到达头部的时候
      if (newVal < this.mixScrollY) {
        zIndex = 10 // 设置z-index让图片盖住文字
        this.$refs.avatar.style.paddingTop = `${OFFSET}px`
      } else {
        this.$refs.avatar.style.paddingTop = `70%`
      }
      this.$refs.avatar.style.zIndex = zIndex
    }
  },
  components: {
    scroll, songList
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
      position absolute
      left 10%
      top 0
      width 80%
      font-size: $font-size-large
      color: $color-text
      text-align center
      z-index 11
    .avatar-image
      position relative
      width 100%
      height 0
      padding-top 70%
      transform-origin top
      background-size cover
      .filter
        position absolute
        left 0
        top 0
        width 100%
        height 100%
        background-color rgba(7, 17, 27, 0.4)
    .list
      position fixed
      width 100%
      bottom 0
      top 0
      background: $color-background
      .song-list-wrapper
        padding 20px 30px
    .layer
      position relative
      height 100%
      background $color-background
</style>
