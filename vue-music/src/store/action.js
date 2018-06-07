import * as types from './mutation-types'
const actions = {
  setPlayer({commit, state}, {list, index}) {
    commit(types.SET_PLAYLIST, list) // 设置播放列表
    commit(types.SET_FULLSCREEN, true) // 设置全屏
    commit(types.SET_SEQUENCELIST, list) // 设置播放顺序列表
    commit(types.SET_CURRENTINDEX, index) // 设置当前播放歌曲的一个索引
    commit(types.SET_PLAYING, true) // 设置播放 打开播放
  },
  // 设置是否全屏
  setFullScreen({commit}, flag) {
    commit(types.SET_FULLSCREEN, flag)
  }
}
export default actions
