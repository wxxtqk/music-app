<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper" v-if="recommendSlider.length>0">
        <slider>
          <div v-for="item in recommendSlider">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" />
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="recommend-title">推荐歌曲列表</h1>
        <ul>
          <li class="item" v-for="item in musicList">
            <div class="icon">
              <img :src="item.imgurl" width="60" height="60">
            </div>
            <div class="text">
              <h1 class="name" v-html="item.creator.name"></h1>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {recommend, musicList} from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import slider from '@/base-components/slider/slider'
export default {
  data () {
    return {
      recommendSlider: [],
      musicList: []
    }
  },
  created () {
    this._fetchRecommend()
    this._fetchMusicList()
  },
  methods: {
    // 轮播图数据
    _fetchRecommend() {
      recommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommendSlider = res.data.slider
        }
      })
      .catch(error => {
        console('错误', error)
      })
    },
    // 歌单数据
    _fetchMusicList () {
      musicList().then(res => {
        res = res.data
        if (res.code === ERR_OK) {
          this.musicList = res.data.list
        }
      })
      .catch(error => {
        console.log('请求歌单错误', error)
      })
    }
  },
  components: {
    slider
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.recommend
  position fixed
  width 100%
  top 85px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      width 100%
      overflow hidden
      position relative
    .recommend-list
      .recommend-title
        height 65px
        line-height 65px
        text-align center
        font-size $font-size-medium
        color $color-theme
      .item
        display flex
        box-sizing border-box
        text-align left 
        padding 0 20px 20px 20px
        .icon
          flex 0 0 60px
          width 60px
          padding-right 20px
        .text
          display flex
          flex 1
          flex-direction column
          justify-content center
          line-height 20px
          overflow hidden
          font-size $font-size-medium
          .name
            margin-bottom 10px
            color $color-text
          .desc
            color $color-text-d

</style>

