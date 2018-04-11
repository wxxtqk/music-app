<template>
  <div class="singer-content">
    <list-view :data="singerList" @selectSinger="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import {fetchSingerList} from '@/api/singer'
import {ERR_OK} from '@/api/config'
import SingerList from '@/utils/singerList'
import listView from '@/base-components/listView/listView'
import {mapMutations} from 'vuex'
const HOT_NAME = '热门'
const HOT_LEN = 10
export default {
  data () {
    return {
      singerList: []
    }
  },
  components: {
    listView
  },
  methods: {
    // 子级传递歌手详情
    selectSinger(item) {
      this.$router.push(`/singer/${item.id}`)
      this.setSinger(item)
    },
    _fetchSingerList() {
      fetchSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singerList = this._normalSingleList(res.data.list)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    _normalSingleList(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          item: []
        }
      }
      list.forEach((item, index) => {
        // 添加热门歌手
        if (index < HOT_LEN) {
          map.hot.item.push(new SingerList({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        // 封装a-zA-Z的字母的歌手
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            item: []
          }
        }
        map[key].item.push(new SingerList({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 处理map，按照a-zA-z的顺序排序
      let hot = []
      let remain = []
      for (const key in map) {
        if (map.hasOwnProperty(key)) {
          const element = map[key]
          if (element.title.match(/[a-zA-Z]/)) {
            remain.push(element)
          } else if (element.title === HOT_NAME) {
            hot.push(element)
          }
        }
      }
      // 处理排序 按照A-Z进行排序
      remain.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(remain)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  created () {
    this._fetchSingerList()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.singer-content
  content ()
</style>
