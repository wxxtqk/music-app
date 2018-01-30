export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  } else {
    // 没有该class则在该元素上新添加class名
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }
}
/**
 * 验证是否有该class名
 * @param {*} el dom元素
 * @param {*} className class名
 */
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '($|\\s)')
  console.log(el.className)
  return reg.test(el.className)
}
