/*
 * @Description: axios
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 05:49:10
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 21:05:12
 */

import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'

function axios(config: AxiosRequestConfig): void {
  // TODO
  processConfig(config)
  xhr(config)
}

// 处理 config
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformRequestData(config)
}

// 处理 config.url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

// 处理 config.data
function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequest(config.data)
}

export default axios
