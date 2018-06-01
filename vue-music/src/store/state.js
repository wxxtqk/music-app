import { playMode } from '@/config'
const state = {
  singer: {}, // 歌手信息
  playing: false, // 控制播放或者不播放
  fullScreen: false, // 是否最小化
  playList: [], // 播放列表
  sequenceList: [], // 播放顺序
  mode: playMode.sequence, // 默认循序播放
  currentIndex: -1 // 当前播放歌曲一个索引
}
export default state
