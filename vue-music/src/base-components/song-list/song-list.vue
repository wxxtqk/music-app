<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(song, index) in songs" @click="select(song, index)">
        <div class="content">
          <h2 class="name" :class="{active: song.id === currentSong.id}">{{song.name}}</h2>
          <p class="desc">{{song | setDesc}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    songs: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  filters: {
    setDesc (song) {
      return `${song.singer}.${song.album}`
    }
  },
  methods: {
    select(item, index) {
      // 向上派发一个选中的歌曲以及一个索引
      // 这是基本组件的一个开发模式
      this.$emit('select', item, index)
    }
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mimix.styl'
  .song-list
    .item
      display flex
      align-items center
      box-sizing border-box
      height 64px
      font-size $font-size-medium
      .content
        flex 1
        line-height 20px
        overflow hidden
        .name
          no-wrap()
          color: $color-text
          &.active
            color $color-theme
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d

</style>


