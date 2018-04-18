// js根据不同的浏览器添加前缀
let el = document.createElement('div').style // 创建一个div并且获取style属性
let render = (() => {
  let fiefix = {
    webkit: 'webkitTransform', // 谷歌浏览器 内核Blink, safari的内核是webkit, 其中Blink是webkit的一个升级版本
    moz: 'mozTransform', // 火狐浏览器 内核Gecko
    O: 'OTransform', // opera浏览器 内核Blink
    ms: 'msTransform', // ie浏览器 Trident
    standard: 'transform' // 标准浏览器
  }
  // 判断是那个浏览器并返回浏览器对应的前缀
  for (const key in fiefix) {
    if (el[fiefix[key]] !== undefined) {
      return key
    }
  }
  // 如果是个假浏览器
  return false
})()

export default function prefixStyle(attribute) {
  if (render === false) {
    return false
  }
  if (render === 'standard') {
    return attribute
  }
  return render + attribute.charAt(0).toUpperCase() + attribute.substr(1)
}
