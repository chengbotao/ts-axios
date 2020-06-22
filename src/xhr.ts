/*
 * @Description: XMLHttpRequest
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 06:05:18
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 22:35:10
 */

import { AxiosRequestConfig } from './types/index'

export default function xhr(config: AxiosRequestConfig): void {
  // TODO
  const { data = null, url, method = 'get', headers } = config

  const XHR = new XMLHttpRequest()

  XHR.open(method.toUpperCase(), url, true)

  // XHR 发送 headers
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      XHR.setRequestHeader(name, headers[name])
    }
  })

  XHR.send(data)
}
