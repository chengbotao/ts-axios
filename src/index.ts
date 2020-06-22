/*
 * @Description: axios
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 05:49:10
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 13:07:49
 */

import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/url'

function axios(config: AxiosRequestConfig): void {
  // TODO
  processConfig(config)
  xhr(config)
}

// 处理 config
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
}

// 处理 config.url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
