/*
 * @Description: transform
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-26 09:33:54
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-26 09:37:41
 */

import { AxiosTransformer } from './../types/index'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fns) {
    return data
  }

  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  // 实现数组函数 链式操作
  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
