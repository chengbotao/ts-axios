/*
 * @Description: cookie
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-26 21:48:39
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-26 21:53:20
 */

import cookie from '../../src/helpers/cookie'

describe('helpers:cookie', () => {
  test('should read cookies', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('foo')).toBe('baz')
  })

  test('should return null if cookie name is not exist', () => {
    document.cookie = 'foo=baz'
    expect(cookie.read('bar')).toBeNull()
  })
})
