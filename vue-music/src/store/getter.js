const getters = {
  singer: state => state.singer, // 获取歌手
  playing: state => state.playing, // 是否播放或者不播放
  fullScreen: state => state.fullScreen, // 是否最小化
  playList: state => state.playList, // 播放列表
  sequenceList: state => state.sequenceList, // 顺序播放列表
  mode: state => state.mode, // 播放模式
  currentIndex: state => state.currentIndex, // 当前播放歌曲的一个索引
  currentSong: state => {
    return state.playList[state.currentIndex] || {} // 当前播放的一个歌曲, 如果没有返回一个空的
  }
}
export default getters
