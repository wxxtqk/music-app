<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
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
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script>
import {recommend} from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import slider from '@/base-components/slider/slider'
export default {
  data () {
    return {
      recommendSlider: []
    }
  },
  created () {
    this._fetchRecommend()
  },
  methods: {
    _fetchRecommend() {
      recommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommendSlider = res.data.slider
        }
      })
      .catch(error => {
        console('错误', error)
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
    .recommend-wrapper
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
</style>

