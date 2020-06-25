/*
 * @Description: interceptors
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-25 10:35:26
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-25 10:48:41
 */

import axios from "../../src/index";

axios.interceptors.request.use(config => {
  config.headers.test += "1"
  return config;
})
axios.interceptors.request.use(config => {
  config.headers.test += "2"
  return config;
})
axios.interceptors.request.use(config => {
  config.headers.test += "3"
  return config;
})

axios.interceptors.response.use(res => {
  res.data += "1"
  return res
})
let interceptor = axios.interceptors.response.use(res => {
  res.data += "2"
  return res
})
axios.interceptors.response.use(res => {
  res.data += "3"
  return res
})

axios.interceptors.response.eject(interceptor)


// tslint:disable-next-line: no-floating-promises
axios.get("/interceptor/get", {
  headers: {
    test: ""
  }
}).then(res => {
  console.log(res.data)
})
