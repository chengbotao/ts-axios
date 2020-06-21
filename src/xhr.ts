/*
 * @Description: XMLHttpRequest
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 06:05:18
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 06:19:55
 */

import { AxiosRequestConfig } from './types/index'

export default function xhr(config: AxiosRequestConfig): void {
  // TODO
  const { data = null, url, method = 'get' } = config

  const XHR = new XMLHttpRequest()

  XHR.open(method.toUpperCase(), url, true)
  XHR.send(data)
}
