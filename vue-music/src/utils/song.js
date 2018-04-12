export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id // 歌曲的id
    this.mid = mid // 歌曲的mid,用来以后拼接图片路径跟音乐路径
    this.name = name // 歌曲的名称
    this.album = album // 歌曲的专辑
    this.duration = duration // 歌曲的长度
    this.image = image // 歌曲的图片
    this.url = url // 歌曲的地址
  }
}
// 共同的数据重铸方法
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(matchMedia.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=0`
  })
}
function filterSinger (singers) {
  let ret = []
  if (!singers) {
    return ''
  }
  singers.forEach(item => {
    ret.push(item.name)
  })
  return ret.join('/')
}
