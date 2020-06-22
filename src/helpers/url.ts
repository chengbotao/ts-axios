/*
 * @Description: url
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 11:25:18
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 21:01:08
 */

import { isDate, isPlainObject } from './utils'

// encode 编码, 并过滤一些特殊字符
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  // 如果没有 params 参数
  if (!params) {
    return url
  }

  // parts 字符串数组保存所有参数的键值对,如:["userName=chengbotao","passWord=123456",...]
  const parts: string[] = []

  // 拼接params
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 如果 val 为空或者undefined
    if (val === null || typeof val === 'undefined') {
      return
    }

    // 统一格式
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams) {
    // 去掉 url 的 hash 字符
    let markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    /*
     * url 是否自带参数,以 ? 做判断
     * url?: https://localhost:8080/?useName=chengbotao
     * url?: https://localhost:8080/
     */
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
