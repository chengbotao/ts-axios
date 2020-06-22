/*
 * @Description: data
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 20:54:03
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 21:00:49
 */

import { isPlainObject } from './utils'

export function transformRequest(data: any): any {
  // TODO
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
