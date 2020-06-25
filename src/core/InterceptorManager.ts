/*
 * @Description: InterceptorManager
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-25 09:16:39
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-25 09:32:09
 */

import { ResolvedFn, RejectedFn } from './../types/index'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }
  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
