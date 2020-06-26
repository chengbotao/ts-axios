/*
 * @Description: CancelToken
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-26 10:39:39
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-26 11:12:49
 */

import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })
    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }
  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
