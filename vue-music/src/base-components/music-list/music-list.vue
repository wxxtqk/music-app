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
      <!-- 播放按钮 -->
      <div class="play-wrapper">
        <div class="play-btn">
          <i class="icon-play"></i>
          <span class="play-text">播放全部</span>
        </div>
      </div>
      <!-- 模糊层 -->
      <div class="filter" ref="filter"></div>
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
import prefixStyle from '@/utils/prefixStyle'
const OFFSET = 42 // 设置偏移量，防止滚动到头部把back按钮挡住了
// 根据不同浏览器转换成不同的前缀
const transform = prefixStyle('transform')
const filter = prefixStyle('filter')

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
      let scale = 1
      let blur = 0
      // 监听滚动的位置，给layer设置偏移量
      this.$refs.layer.style[transform] = `translate3d(0,${newScrollY}px,0)`
      let percent = Math.abs(newVal / this.avatarHeight)
      // 当往滑到头部后继续往下滚动的时候
      if (newVal > 0) {
        scale = percent + 1
        zIndex = 10
      } else {
        // 往上滚动
        blur = Math.min(5 * percent, 5)
      }
      // 设置高斯模糊效果
      this.$refs.filter.style[filter] = `blur(${blur}px)`
      // 当滚动的内容还没有到达头部的时候
      if (newVal < this.mixScrollY) {
        zIndex = 10 // 设置z-index让图片盖住文字
        this.$refs.avatar.style.paddingTop = `${OFFSET}px`
      } else {
        this.$refs.avatar.style.paddingTop = `70%`
      }
      this.$refs.avatar.style.zIndex = zIndex
      // 设置缩放后宽高 this.avatarHeight * scale = this.avatarHeight * (newVal / this.avatarHeight) = newVal
      // 这样就可以无缝缩放了
      this.$refs.avatar.style[transform] = `scale(${scale})`
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
      .play-wrapper
        position absolute
        z-index 12
        width 100%
        bottom 20px
        .play-btn
          box-sizing border-box
          margin 0 auto
          width 135px
          color $color-theme
          border-radius 100px
          border 1px solid $color-theme
          text-align center
          padding 7px 0
          .icon-play
            display inline-block
            vertical-align middle
            font-size: $font-size-medium-x
            margin-right 6px
          .play-text
            display inline-block
            vertical-align middle
            font-size: $font-size-small
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
