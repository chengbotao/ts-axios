/*
* @Description: config
* @version:
* @Author: Chengbotao
* @Date: 2020-06-25 18:03:27
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-26 09:52:51
*/
import axios from "../../src/index"
import { AxiosTransformer } from './../../src/types/index';

axios.defaults.headers.common["test2"] = 123
// tslint:disable-next-line: no-floating-promises
axios({
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function (data) {
    if (typeof data === "object") {
      data.b = 2
    }
    return data
  }],
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
