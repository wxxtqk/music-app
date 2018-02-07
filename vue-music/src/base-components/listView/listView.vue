<template>
  <scroll class="list-view" :data="data" ref="singerScroll">
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
        <li class="abbreviate-list" v-for="(item, index) in abbreviate" :data-index="index">{{item}}</li>
      </ul>
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
export default {
  props: {
    data: {
      type: Array,
      default: null
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
    }
  },
  methods: {
    onAbbreviateTouchStart(e) {
      let AbbreviateIndex = attr(e.target, 'index')
      this.firstStart = parseInt(AbbreviateIndex) // 记录手指按下的位置
      this.client.start = e.touches[0].pageY // 记录第一根手指的位置
      this._scrollTo(AbbreviateIndex)
    },
    onAbbreviateTouchMove(e) {
      this.client.end = e.touches[0].pageY // 记录移动了多远
      let dist = (this.client.end - this.client.start) / ABB_HEIGHT | 0 // 计算移动了几个缩略字
      let diff = this.firstStart + dist
      this._scrollTo(diff)
    },
    _scrollTo(index) {
      this.$refs.singerScroll.scrollToElement(this.$refs.groupItem[index], 0)
    }
  },
  created () {
    // 记录滚动的位置
    this.client = {}
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
  .loading-content
    loading-content()
</style>

