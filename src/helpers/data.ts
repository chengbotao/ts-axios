/*
 * @Description: data
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 20:54:03
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-23 08:41:56
 */

import { isPlainObject } from './utils'

export function transformRequest(data: any): any {
  // TODO
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    // 是字符串不一定是对象字符串
    try {
      data = JSON.parse(data)
    } catch (error) {
      // do nothing
    }
  }

  return data
}
