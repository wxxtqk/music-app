<template>
  <transition name="detail">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchSingerDetail } from '@/api/singer'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/utils/song'
export default {
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    // 获取歌手的歌曲列表
    _fetchSingerDetail(id) {
      // 处理边界的情况
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      fetchSingerDetail(id).then(res => {
        if (res.code === ERR_OK) {
          let ret = []
          res.data.list.forEach(item => {
            let {musicData} = item
            ret.push(createSong(musicData))
          })
          console.log(ret)
        }
      })
      .catch(error => {
        console.log(`错误${error}`)
      })
    }
  },
  created () {
    this._fetchSingerDetail(this.singer.id)
  }
}
</script>


<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.singer-detail
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  z-index 100
  background-color $color-background
.detail-enter-active, .detail-leave-active
  transition all .3s
.detail-enter, .detail-leave-to
  transform translate3d(100%, 0, 0)

</style>

