/*
 * @Description: simple
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 07:05:49
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 07:15:10
 */

import axios from "../../src/index";

axios({
  method: "get",
  url: "/simple/get",
  params: {
    a: 1,
    b: 2
  }
})
