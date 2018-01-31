import jsonp from '@/utils/fetch'
import { commonParams, options } from './config'
import fetch from '@/utils/ajax'
export function recommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
export function musicList () {
  let data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    sin: 0,
    ein: 29,
    rnd: Math.random(),
    format: 'json'
  })
  console.log(data)
  const url = '/api/musicList'
  return fetch({
    url: url,
    method: 'GET',
    params: data
  })
}
