/*
 * @Description: headers
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 22:13:19
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-23 08:34:13
 */

import { isPlainObject } from './utils'

function normalizeHeaders(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

// 格式化 headers
export function processHeaders(headers: any, data: any): any {
  normalizeHeaders(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

// 处理 response headers
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }

    parsed[key] = val
  })

  return parsed
}
