/*
* @Description: config
* @version:
* @Author: Chengbotao
* @Date: 2020-06-25 18:03:27
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-26 10:10:06
*/
import axios from "../../src/index"
import { AxiosTransformer } from './../../src/types/index';

axios.defaults.headers.common["test2"] = 123
const Instance = axios.create({
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function (data) {
    if (typeof data === "object") {
      data.b = 2
    }
    return data
  }]
})
// tslint:disable-next-line: no-floating-promises
Instance({
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
