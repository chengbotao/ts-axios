/*
 * @Description: extend
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-24 22:53:46
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-24 22:58:32
 */

import axios from "../../src/index";

axios({
  url: "/extend/post",
  method: "post",
  data: {
    msg: "hello"
  }
})

axios.request({
  url: "/extend/post",
  method: "post",
  data: {
    msg: "hello"
  }
})

axios.get("/extend/get")
axios.delete("/extend/delete")
axios.head("/extend/head")
axios.options("/extend/options")

axios.post("/extend/post", {
  msg: "post"
})
axios.put("/extend/put", {
  msg: "put"
})
axios.patch("/extend/patch", {
  msg: "patch"
})
