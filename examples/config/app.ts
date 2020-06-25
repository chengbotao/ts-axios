/*
 * @Description: config
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-25 18:03:27
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-25 18:11:50
 */
import axios from "../../src/index"

axios.defaults.headers.common["test2"] = 123
// tslint:disable-next-line: no-floating-promises
axios({
  url: "/config/post",
  method: "post",
  headers: {
    test: "321"
  },
  data: {
    a: "1"
  }
}).then(res => {
  console.log(res)
})
