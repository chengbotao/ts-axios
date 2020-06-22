/*
 * @Description: base get url
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 13:17:42
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 13:28:37
 */

import axios from "../../src";

// 值为数组
axios({
  method: "get",
  url: "/base_get_url/get",
  params: {
    foo: ["bar", "baz"]
  }
})

// 值为对象
axios({
  method: "get",
  url: "/base_get_url/get",
  params: {
    foo: {
      bar: "baz"
    }
  }
})

// 值为 Date
const date = new Date();
axios({
  method: "get",
  url: "/base_get_url/get",
  params: {
    date
  }
})

// 值包含特殊字符
axios({
  method: "get",
  url: "/base_get_url/get",
  params: {
    foo: "@$;: "
  }
})

// 值包含 null
axios({
  method: "get",
  url: "/base_get_url/get",
  params: {
    foo: "bar",
    baz: null
  }
})

// hash url 过滤
axios({
  method: "get",
  url: "/base_get_url/get#hash",
  params: {
    foo: "bar",
    baz: null
  }
})

// url 自带一些参数
axios({
  method: "get",
  url: "/base_get_url/get?foo=bar",
  params: {
    bar: "baz"
  }
})
