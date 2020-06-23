/*
 * @Description: error
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-23 22:02:11
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-23 22:42:47
 */

import axios from "../../src/index";

// tslint:disable-next-line: no-floating-promises
axios({
  method: "get",
  url: "/error/timeout",
  params: {
    a: 1,
    b: 2
  },
  timeout: 2000
}).then(res => {
  console.log(res)
}).catch(e=>{
  console.log(e.message)
})

// tslint:disable-next-line: no-floating-promises
setTimeout(()=>{
  axios({
    method: "get",
    url: "/error/get",
    params: {
      a: 1,
      b: 2
    }
  }).then(res => {
    console.log(res)
  }).catch(e=>{
    console.log(e)
  })
}, 50000)

// tslint:disable-next-line: no-floating-promises
axios({
  method: "get",
  url: "/error/get",
  params: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res)
}).catch(e=>{
  console.log(e)
})

// tslint:disable-next-line: no-floating-promises
axios({
  method: "get",
  url: "/error/post",
  params: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res)
}).catch(e=>{
  console.log(e)
})
