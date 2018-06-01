import * as types from './mutation-types'
const mutations = {
  // 设置歌手信息
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  // 控制播放或者不播放
  [types.SET_PLAYING](state, flag) {
    state.playing = flag
  },
  // 控制是否全屏
  [types.SET_FULLSCREEN](state, flag) {
    state.fullScreen = flag
  },
  // 设置播放列表
  [types.SET_PLAYLIST](state, list) {
    state.playList = list
  },
  // 设置播放顺序列表
  [types.SET_SEQUENCELIST](state, list) {
    state.sequenceList = list
  },
  // 设置播放模式
  [types.SET_MODE](state, mode) {
    state.mode = mode
  },
  // 设置播放歌曲一个索引
  [types.SET_CURRENTINDEX](state, index) {
    state.currentIndex = index
  }
}
export default mutations
