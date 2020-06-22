/*
 * @Description: public interface
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 05:52:52
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 22:23:38
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
}
