const axios = require('axios')
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000
})
service.interceptors.request.use(config => {
  config.headers['referer'] = 'https://c.y.qq.com/'
  config.headers['host'] = 'c.y.qq.com'
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})
module.exports = service
