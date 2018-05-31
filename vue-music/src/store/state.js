import { playMode } from '@/config'
const state = {
  singer: {}, // 歌手信息
  playing: false, // 控制播放或者不播放
  fullScreen: false, // 是否最小化
  playList: [], // 播放列表
  sequenceList: [], // 播放顺序
  mode: playMode.sequence // 默认循序播放
}
export default state
