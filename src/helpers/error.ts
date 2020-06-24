/*
 * @Description: error
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-24 07:56:45
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-24 08:07:44
 */

import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // 解决 ts 继承内置函数坑
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

// 工厂函数
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
) {
  const ERROR = new AxiosError(message, config, code, request, response)

  return ERROR
}
