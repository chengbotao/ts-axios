/*
 * @Description: XMLHttpRequest
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 06:05:18
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-23 08:37:11
 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'

import { parseHeaders } from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  // TODO
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const XHR = new XMLHttpRequest()

    if (responseType) {
      XHR.responseType = responseType
    }

    XHR.open(method.toUpperCase(), url, true)

    XHR.onreadystatechange = function handleLoad() {
      if (XHR.readyState !== 4) {
        return
      }

      const responseHeaders = parseHeaders(XHR.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? XHR.response : XHR.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: XHR.status,
        statusText: XHR.statusText,
        headers: responseHeaders,
        config,
        request: XHR
      }

      resolve(response)
    }

    // XHR 发送 headers
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        XHR.setRequestHeader(name, headers[name])
      }
    })

    XHR.send(data)
  })
}
