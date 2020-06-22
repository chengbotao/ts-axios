/*
 * @Description: headers
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 22:13:19
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 22:34:44
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
