/*
 * @Description: Cancel
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-26 11:03:13
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-26 11:05:20
 */

export default class Cancel {
  message?: string
  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
