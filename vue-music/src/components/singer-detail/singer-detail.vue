<template>
  <transition name="detail">
    <music-list :title="title" :avatar="avatar" :songs="songs"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchSingerDetail } from '@/api/singer'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/utils/song'
import musicList from '@/base-components/music-list/music-list'
export default {
  computed: {
    // 用户名字
    title() {
      return this.singer.name
    },
    // 用户的头像
    avatar() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  components: {
    musicList
  },
  data () {
    return {
      songs: []
    }
  },
  methods: {
    // 获取歌手的歌曲列表
    _fetchSingerDetail(id) {
      // 处理边界的情况
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      // 根据歌手的id获取歌曲
      fetchSingerDetail(id).then(res => {
        if (res.code === ERR_OK) {
          let ret = []
          res.data.list.forEach(item => {
            let {musicData} = item // es6的解构
            ret.push(createSong(musicData)) // 对获取的数据进行二次封装，方便以后用得重用，降低其耦合性
          })
          this.songs = ret
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
.detail-enter-active, .detail-leave-active
  transition all .3s
.detail-enter, .detail-leave-to
  transform translate3d(100%, 0, 0)

</style>

