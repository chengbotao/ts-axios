/*
 * @Description: axios
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 05:49:10
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-24 22:52:09
 */

import { AxiosInstance } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/utils'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
