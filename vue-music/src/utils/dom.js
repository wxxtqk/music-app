/**
 * 设置attribute
 * @param {*} el 元素
 * @param {*} name attribute后缀
 * @param {*} val 给attribute这是的值
 */
export function attr(el, name, val) {
  const prefix = `data-${name}`
  if (val) {
    return el.setAttribute(prefix, val)
  } else {
    return el.getAttribute(prefix)
  }
}
