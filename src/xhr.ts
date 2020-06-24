/*
 * @Description: XMLHttpRequest
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 06:05:18
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-24 08:33:24
 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'

import { parseHeaders } from './helpers/headers'

import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  // TODO
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const XHR = new XMLHttpRequest()

    if (responseType) {
      XHR.responseType = responseType
    }

    if (timeout) {
      XHR.timeout = timeout
    }

    XHR.open(method.toUpperCase(), url, true)

    XHR.onreadystatechange = function handleLoad() {
      if (XHR.readyState !== 4) {
        return
      }

      if (XHR.status === 0) {
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

      handleResponse(response)
    }

    XHR.onerror = function handleError() {
      reject(createError('Network Error', config, null, XHR))
    }

    XHR.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', XHR))
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
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            XHR,
            response
          )
        )
      }
    }
  })
}
