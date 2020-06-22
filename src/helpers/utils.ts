/*
 * @Description: utils
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 12:20:57
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 12:48:39
 */

const toString = Object.prototype.toString

// 是否是 Date
export function isDate(val: any): val is Date {
  return toString.call(val) === '[Object Date]'
}

// 是否是 Object, null 做熔断
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
