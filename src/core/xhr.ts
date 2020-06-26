/*
 * @Description: XMLHttpRequest
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 06:05:18
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-26 17:00:57
 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'

import { parseHeaders } from '../helpers/headers'

import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/utils'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  // TODO
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config

    const XHR = new XMLHttpRequest()

    XHR.open(method.toUpperCase(), url!, true)

    configureRequest()
    addEvents()
    processHeaders()
    processCancel()

    XHR.send(data)

    function configureRequest(): void {
      if (responseType) {
        XHR.responseType = responseType
      }

      if (timeout) {
        XHR.timeout = timeout
      }

      // 跨域是否携带 cookie
      if (withCredentials) {
        XHR.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
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

      // 上传下载的进度
      if (onDownloadProgress) {
        XHR.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        XHR.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      // xsrf 防御
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfVal = cookie.read(xsrfCookieName)
        if (xsrfVal && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfVal
        }
      }

      // XHR 发送 headers
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          XHR.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      // 取消请求
      if (cancelToken) {
        // tslint:disable-next-line: no-floating-promises
        cancelToken.promise.then(reason => {
          XHR.abort()
          reject(reason)
        })
      }
    }

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
