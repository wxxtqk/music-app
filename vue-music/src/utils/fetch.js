import orginJsonp from 'jsonp'
export default function jsonp (url, data, opt) {
  return new Promise((resolve, reject) => {
    orginJsonp(url, opt, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
