<template>
  <scroll class="list-view" 
    :data="data" 
    ref="singerScroll" 
    :probeType="probeType" 
    @scroll="scroll"
    :listenScroll="listenScroll">
    <ul>
      <li v-for="group in data" class="list-group" ref="groupItem">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.item" class="list-item">
            <img v-lazy="item.avatar" class="avatar">
            <p class="name">{{item.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
    <div class="abbreviate" v-show="data.length" @touchstart="onAbbreviateTouchStart" @touchmove.stop.prevent="onAbbreviateTouchMove">
      <ul>
        <li class="abbreviate-list" v-for="(item, index) in abbreviate" :data-index="index" :class="{'currentPage': index === currentIndex}">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div v-show="!data.length" class="loading-content">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import scroll from '@/base-components/scroll/scroll'
import loading from '@/base-components/loading/loading'
import { attr } from 'utils/dom'
const ABB_HEIGHT = 18 // 每个缩略字母的高度
const TITLE_HEIGHT = 30 // 每个title的高度
export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      probeType: 3,
      listenScroll: true,
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  components: {
    scroll, loading
  },
  computed: {
    abbreviate() {
      return this.data.map((item) => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    onAbbreviateTouchStart(e) {
      let AbbreviateIndex = attr(e.target, 'index')
      this.firstStart = parseInt(AbbreviateIndex) // 记录手指按下的位置
      this.client.start = e.touches[0].pageY // 记录第一根手指的位置
      this._scrollTo(this.firstStart)
    },
    onAbbreviateTouchMove(e) {
      this.client.end = e.touches[0].pageY // 记录移动了多远
      let dist = (this.client.end - this.client.start) / ABB_HEIGHT | 0 // 计算移动了几个缩略字
      let diff = this.firstStart + dist
      this._scrollTo(diff)
    },
    _scrollTo(index) {
      // 防止移动过头了
      if (index < 0 || index > this.abbreviate.length - 1 || isNaN(index)) {
        return
      }
      this.currentIndex = index
      // scrollToElement第二个参数是0表示瞬间移动，没有动画效果
      this.$refs.singerScroll.scrollToElement(this.$refs.groupItem[index], 0)
    },
    scroll(pos) {
      this.scrollY = pos.y // 获取y轴滚动的距离
    },
    // 计算每个group的高度
    calcHeight() {
      let lists = this.$refs.groupItem
      if (!lists) {
        return
      }
      this.containerHeight = []
      let height = 0
      this.containerHeight.push(height)
      for (let i = 0; i < lists.length; i++) {
        const elHeight = lists[i].clientHeight
        height += elHeight
        this.containerHeight.push(height)
      }
    }
  },
  watch: {
    // 滚动位置后
    scrollY(val) {
      let dist = -val
      let containerHeight = this.containerHeight
      for (let i = 0; i < containerHeight.length; i++) {
        let height1 = containerHeight[i]
        let height2 = containerHeight[i + 1]
        if (!height2 || ((height1 < dist) && (dist < height2))) {
          // 当往上面滑，超过了，滑到第一个过后
          if (dist <= 0) {
            this.currentIndex = 0
            return
          }
          this.diff = height2 - dist
          this.currentIndex = i
          return
        }
      }
    },
    diff(val) {
      // 计算固定栏偏移量
      let fixedTop = (val < TITLE_HEIGHT && val > 0) ? val - TITLE_HEIGHT : 0
      // 减少dom的操作
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      // 使用transform的translate3d开启gpu加速模式
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    },
    // 数据来了后 就计算高度
    data() {
      setTimeout(() => {
        this.calcHeight()
      }, 20)
    }
  },
  created () {
    // 记录滚动的位置
    this.client = {}
    setTimeout(() => {
      this.calcHeight()
    }, 20)
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.list-view
  position relative
  width 100%
  height 100%
  overflow hidden
  background $color-background
  .list-group
    padding-bottom 30px
    .list-group-title
      height 30px
      line-height 30px
      padding-left 20px
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
    .list-item
      display flex
      align-items center
      padding 20px 0 0 30px
      .avatar
        width 50px
        height 50px
        border-radius 50%
      .name
        margin-left: 20px
        color $color-text-l
        font-size $font-size-medium
  .abbreviate
    position absolute
    top 50%
    right 0
    z-index 20
    transform translateY(-50%)
    width 20px
    padding 20px 0
    text-align center
    font-family Helvetica
    background $color-background-d
    .abbreviate-list
      color $color-text-l
      font-size $font-size-small
      padding 3px
      line-height 1
      &.currentPage
        color $color-theme
  .list-fixed
    position absolute
    left 0
    top 0
    width 100%
    .fixed-title
      height 30px
      line-height 30px
      padding-left 20px
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
  .loading-content
    loading-content()
</style>

