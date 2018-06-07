<template>
  <div class="player" v-show="playList.length>0">
    <transition name="normal-player"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave"
      >
      <div class="normal-player" v-show="fullScreen">
        <!-- 高斯模糊层 -->
        <div class="background">
          <img :src="currentSong.image" width="100%" height="100%" >
        </div>
        <!-- 头部 -->
        <div class="top">
          <!-- 返回按钮 -->
          <div class="back" @click="hidden">
            <i class="icon-back"></i>
          </div>
          <!-- 歌曲名称 -->
          <h1 class="song-title" v-html="currentSong.name"></h1>
          <h2 class="song-subtitle" v-html="currentSong.singer"></h2>
        </div>
        <!-- 中间部分 -->
        <div class="middle">
          <!-- 中间图片区域 -->
          <div class="middle-l">
            <!-- 图片外部容器 通过padding让其成为一个正方形-->
            <div class="cd-wrapper" ref="cdWrapper">
              <!-- 图片外部容器，设置圆和边角灰 -->
              <div class="cd" :class="cdCls">
                <img :src="currentSong.image" alt="" class="song-img">
              </div>
            </div>
          </div>
        </div>
        <!-- 底部 控制区域-->
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <!-- 进度条容器 -->
          <div class="progress-wrapper">
            <span class="time time-l">{{currentTime | pod}}</span>
            <div class="progress">
              <progress-bar :percent="percent"></progress-bar>
            </div>
            <span class="time time-r">{{currentSong.duration | pod}}</span>
          </div>
          <!-- 操作界面 -->
          <div class="operators">
            <!-- 设置播放模式按钮 -->
            <div class="icon i-left">
              <i :class="iconMode"></i>
            </div>
            <!-- 上一首歌曲按钮 -->
            <div class="icon i-left" :class="clsDisable">
              <i class="icon-prev" @click="prev"></i>
            </div>
            <!-- 点击播放暂停按钮 -->
            <div class="icon i-center" :class="clsDisable">
              <i :class="playIcon" @click="togglePlaying"></i>
            </div>
            <!-- 下一首歌曲按钮 -->
            <div class="icon i-right" :class="clsDisable">
              <i class="icon-next" @click="next"></i>
            </div>
            <!-- 点击收藏 -->
            <div class="icon i-right">
              <i class="icon-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 小播放器 -->
    <transition name="mini-player">
      <div class="mini-player" v-show="!fullScreen"  @click="open">
        <!-- 用户头像 -->
        <div class="icon">
          <img :src="currentSong.image" alt="" width="40" height="40" :class="cdCls">
        </div>
        <!-- 歌曲名和描述 -->
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <!-- 进度条 -->
        <div class="control">
          <i :class="miniPlayerIcon" @click.stop="togglePlaying"></i>
        </div>
        <!-- 点击打开歌曲列表icon -->
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="update"></audio>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import animations from 'create-keyframe-animation'
import prefixStyle from '@/utils/prefixStyle'
import progressBar from '@/base-components/progress/progress-bar'
export default {
  components: {
    progressBar
  },
  data () {
    return {
      currentTime: 0, // 歌曲的播放时间
      songState: false // 标识符控制歌曲是否加载完成
    }
  },
  methods: {
    update(e) {
      this.currentTime = e.target.currentTime
    },
    // 上一首歌
    prev() {
      // 如果歌曲没有加载完成，当网络不好 的时候不允许用户切换歌曲
      if (!this.songState) {
        return
      }
      let index = (this.currentIndex - 1) === -1 ? this.playList.length - 1 : this.currentIndex - 1
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songState = false
    },
    // 点击下一首歌曲
    next() {
      // 如果歌曲没有加载完成，当网络不好 的时候不允许用户切换歌曲
      if (!this.songState) {
        return
      }
      let index = (this.currentIndex + 1) >= this.playList.length ? 0 : this.currentIndex + 1
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songState = false
    },
    // 歌曲加载完成
    ready() {
      this.songState = true
    },
    error() {
      this.songState = true
    },
    // 关闭全屏
    hidden() {
      this.setFullScreen(false)
    },
    // 打开全屏
    open() {
      this.setFullScreen(true)
    },
    // 点击播放和暂停
    togglePlaying() {
      this.setPlaying(!this.playing)
    },
    // vue的动画js钩子函数
    enter(el, done) {
      let {x, y, scale} = this._getPosAndScale()
      // 设置动画
      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        }
      }
      // 注册动画组件
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400, // 动画的时间
          easing: 'linear'
        }
      })
      // 开始执行动画
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move') // 移开动画
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = 'all .3s' // 设置动画
      let {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style[prefixStyle('transform')] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done) // 监听动画完成后执行钩子函数
    },
    afterLeave() {
      // 动画离开后移除所有的动画
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[prefixStyle('transform')] = ''
    },
    // 获取mini播放器图片的位置，方便
    _getPosAndScale() {
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth
      const height = window.innerHeight
      const x = -(width / 2 - paddingLeft)
      const y = height - (width / 2) - paddingBottom - paddingTop
      const scale = paddingLeft / (width / 2)
      return {x, y, scale}
    },
    ...mapActions([
      'setFullScreen'
    ]),
    ...mapMutations({
      setPlaying: 'SET_PLAYING', // 设置是否播放
      setCurrentIndex: 'SET_CURRENTINDEX' // 设置播放歌曲的索引
    })
  },
  computed: {
    // 控制旋转的动画
    cdCls() {
      return this.playing ? 'play' : 'pause play'
    },
    // 当歌曲没有加载的时候按钮显示为灰色
    clsDisable() {
      return this.songState ? '' : 'disable'
    },
    // 播放进度百分百,用于控制进度条
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    // 播放或者暂停按钮
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    // 循环播放、顺序播放、随机播放
    iconMode() {
      const icon = ['icon-loop', 'icon-sequence', 'icon-random']
      return icon[this.mode]
    },
    // mini播放器pause or play 按钮
    miniPlayerIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    ...mapGetters([
      'playList', // 播放列表
      'fullScreen', // 是否全屏
      'currentSong', // 当前播放的歌曲
      'playing', // 是否播放
      'mode', // 播放的模式
      'currentIndex' // 当前歌曲的一个是索引
    ])
  },
  watch: {
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing(newval) {
      let playAudio = this.$refs.audio
      this.$nextTick(() => {
        newval ? playAudio.play() : playAudio.pause()
      })
    }
  },
  filters: {
    // 处理时间的过滤器
    pod(val) {
      val = val | 0 // 向下取整
      let minute = val / 60 | 0 // 获取分钟
      let second = val % 60 // 获取秒钟
      // 已mm: ss 的形式形式出来
      if (minute.toString().length < 2) {
        minute = '0' + minute
      }
      if (second.toString().length < 2) {
        second = '0' + second
      }
      return `${minute}:${second}`
    }
  }
}
</script>
  

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mimix"
  .player
    .normal-player
      position fixed
      left 0
      top 0
      right 0
      bottom 0
      background $color-background
      z-index 150
      .background
        position absolute
        left 0
        top 0
        width 100%
        height 100%
        z-index -1
        opacity 0.6
        filter blur(20px)
      .top
        position relative
        margin-bottom 25px
        .back
          position absolute
          top 0
          left 6px
          z-index 50px
          .icon-back
            display block
            padding 9px
            font-size $font-size-large-x
            color $color-theme
            transform rotate(-90deg)
        .song-title
          no-wrap()
          width 70%
          text-align center
          line-height 40px
          margin 0 auto
          font-size: $font-size-large
          color: $color-text
        .song-subtitle
          text-align center
          line-height 20px
          font-size $font-size-medium
          color $color-text
      .middle
        position fixed
        width 100%
        top 80px
        bottom 170px
        white-space nowrap
        font-size 0
        .middle-l
          display inline-block
          position relative
          width 100%
          height 0
          padding-top 80%
          .cd-wrapper
            position absolute
            left 10%
            top 0
            width 80%
            height 100%
            .cd
              width 100%
              height 100%
              box-sizing border-box
              border-radius 50%
              border 10px solid rgba(255, 255, 255, 0.1)
              .song-img
                position absolute
                left 0
                top 0
                width 100%
                height 100%
                border-radius 50%
              &.play
                animation rotate 20s linear infinite
              &.pause
                animation-play-state paused
      .bottom
        position absolute
        width 100%
        bottom 50px
        .dot-wrapper
          text-align center
          font-size 0
        .progress-wrapper
          display flex
          align-items center
          width 80%
          padding 10px 0
          margin  0 auto
          .time
            flex 0 0 30px
            line-height 30px
            height 30px
            color $color-text
            font-size: $font-size-small
          .progress
            flex 1
        .operators
          display flex
          align-items center
          .icon
            flex 1
            color $color-theme
            &.disable
              color $color-text-d
            i
              font-size 30px
          .i-left
            text-align right 
          .i-center
            text-align center
            i 
              font-size 40px
          .i-right
            text-align left 
      &.normal-player-enter-active, &.normal-player-leave-active
        transition all .3s
        .top, .bottom
          transition all .3s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-player-enter, &.normal-player-leave-to
        opacity 0
        .top
          transform translate3d(0, -100px, 0)
        .bottom
          transform translate3d(0, 100px, 0)
    .mini-player
      display flex
      align-items center
      left 0
      bottom 0
      position fixed
      z-index 180
      width 100%
      height 60px
      background: $color-highlight-background
      .icon
        flex 0 0 40px
        width 40px
        padding 0 10px 0 20px
        img 
          border-radius 50%
          &.play
            animation  rotate 10s linear infinite
          &.pause
            animation-play-state paused
      .text
        flex 1
        display flex
        line-height 20px
        overflow hidden
        flex-direction column
        justify-content center
        .name
          margin-bottom 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex 0 0 30px
        width 30px
        padding 0 10px
        color $color-theme-d
        .icon-pause-mini, .icon-play-mini
          font-size 25px
        .icon-playlist
          font-size 30px

      &.mini-player-enter-active, &.mini-player-leave-active
        transition all .3s
      &.mini-player-enter, &.mini-player-leave-to
        opacity 0
  @keyframes rotate
    0%
      transform rotate(0)
    100%
      transform  rotate(360deg)
</style>

 