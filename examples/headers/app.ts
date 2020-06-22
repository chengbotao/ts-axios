/*
 * @Description: headers
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 22:37:09
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 23:28:25
 */

import axios from "../../src/index";

axios({
  method: "post",
  url: "/headers/post",
  headers: {
    "content-type": "application/json;charset=utf-8"
  },
  data: {
    foo: 1,
    bar: 2
  }
})

axios({
  method: "post",
  url: "/headers/contentType",
  data: {
    foo: 1,
    bar: 2
  }
})

const paramsString = "q=URLUtils.searchParams&topic=api";
const searchParams = new URLSearchParams(paramsString);
axios({
  method: "post",
  url: "/headers/searchParams",
  data: searchParams
})
