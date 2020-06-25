/*
 * @Description: utils
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 12:20:57
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-25 16:44:01
 */

const toString = Object.prototype.toString

// 是否是 Date
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 是否是 Object, null 做熔断
// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 拷贝
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}

// 对象深拷贝
export function deepMerge(...objects: any[]): any {
  const result = Object.create(null)
  objects.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
