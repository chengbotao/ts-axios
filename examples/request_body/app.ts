/*
 * @Description: request body
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 21:07:36
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 21:18:51
 */

import axios from "../../src/index";

axios({
  method: "post",
  url: "/request_body/post",
  data: {
    foo: 1,
    bar: 2
  }
})


let arr = new Int32Array([21,31])
axios({
  method: "post",
  url: "/request_body/buffer",
  data: arr
})
