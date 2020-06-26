/*
 * @Description: dispatchRequest
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 05:49:10
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-26 11:15:34
 */

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // TODO
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理 config
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 处理 config.url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// 处理 response data
function transformResponseData(res: AxiosResponse) {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

// 是否取消
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
