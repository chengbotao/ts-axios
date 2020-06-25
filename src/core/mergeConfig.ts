/*
 * @Description: mergeConfig
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-25 14:08:13
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-25 16:44:16
 */

import { AxiosRequestConfig } from './../types/index'
import { isPlainObject, deepMerge } from '../helpers/utils'

// 合并策略的函数
const starts = Object.create(null)
function defaultStart(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
function fromVal2Start(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}
function deepMergeStart(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}
const startKeysDeepMerge = ['headers']
startKeysDeepMerge.forEach(key => {
  starts[key] = deepMergeStart
})
const startKeysFromVal2 = ['url', 'params', 'data']
startKeysFromVal2.forEach(key => {
  starts[key] = fromVal2Start
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (const key in config2) {
    mergeFiled(key)
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeFiled(key)
    }
  }
  // 合并方法
  function mergeFiled(key: string): void {
    const start = starts[key] || defaultStart
    config[key] = start(config1[key], config2![key])
  }

  return config
}
