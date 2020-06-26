/*
 * @Description: more
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-26 12:36:12
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-26 12:39:33
 */

import axios from "../../src"
const instance = axios.create({
  xsrfCookieName: "XSRF-TOKEN-D",
  xsrfHeaderName: "X-XSRF-TOKEN-D"
})

// tslint:disable-next-line: no-floating-promises
instance.get("/more/get").then(res => {
  console.log(res)
})
