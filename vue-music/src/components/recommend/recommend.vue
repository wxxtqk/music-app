<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper"></div>
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
export default {
  created () {
    this._fetchRecommend()
  },
  methods: {
    _fetchRecommend() {
      recommend().then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data.slider)
        }
      })
      .catch(error => {
        console('错误', error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.recommend
  position fixed
  width 100%
  top 85px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
</style>

