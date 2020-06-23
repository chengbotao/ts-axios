/*
 * @Description: public interface
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 05:52:52
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-23 21:51:47
 */

// Types of methods
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'

// Request configuration for axios
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

// Response configuration for axios
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// Promise
export interface AxiosPromise extends Promise<AxiosResponse> {}
