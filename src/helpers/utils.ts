/*
 * @Description: utils
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 12:20:57
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 21:01:27
 */

const toString = Object.prototype.toString

// 是否是 Date
export function isDate(val: any): val is Date {
  return toString.call(val) === '[Object Date]'
}

// 是否是 Object, null 做熔断
// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[Object Object]'
}
