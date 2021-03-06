/*
 * @Description: url
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 11:25:18
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-27 19:40:37
 */

import { isDate, isPlainObject, isURLSearchParams } from './utils'

interface URLOrigin {
  protocol: string
  host: string
}

// encode 编码, 并过滤一些特殊字符
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  // 如果没有 params 参数
  if (!params) {
    return url
  }

  let serializedParams

  // 自定义参数序列化
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    // parts 字符串数组保存所有参数的键值对,如:["userName=chengbotao","passWord=123456",...]
    const parts: string[] = []

    // 拼接params
    Object.keys(params).forEach(key => {
      const val = params[key]
      // 如果 val 为空或者undefined
      if (val === null || typeof val === 'undefined') {
        return
      }

      // 统一格式
      let values = []
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }

      values.forEach(val => {
        if (isDate(val)) {
          val = val.toISOString()
        } else if (isPlainObject(val)) {
          val = JSON.stringify(val)
        }

        parts.push(`${encode(key)}=${encode(val)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  if (serializedParams) {
    // 去掉 url 的 hash 字符
    let markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    /*
     * url 是否自带参数,以 ? 做判断
     * url?: https://localhost:8080/?useName=chengbotao
     * url?: https://localhost:8080/
     */
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

// 是否为同源
export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}
const urlParsingNode = document.createElement('a')
// 当前页面的 URL
const currentOrigin = resolveURL(window.location.href)
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host
  }
}

// URL 是否是绝对地址
export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

// 拼接 URL
export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
