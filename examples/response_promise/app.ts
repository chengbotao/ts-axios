/*
 * @Description: response_promise
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-23 08:13:02
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-23 08:23:23
 */

import axios from "../../src/index";

// tslint:disable-next-line: no-floating-promises
axios({
  method: "post",
  url: "/response_promise/post",
  data: {
    foo: 1,
    bar: 2
  }
}).then((res)=>{
  console.log(res)
})
// tslint:disable-next-line: no-floating-promises
axios({
  method: "post",
  url: "/response_promise/post",
  responseType: "json",
  data: {
    foo: 1,
    bar: 2
  }
}).then((res)=>{
  console.log(res)
})
