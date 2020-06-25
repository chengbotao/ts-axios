/*
 * @Description: server
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 06:54:03
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-25 10:43:55
 */

const express = require("express");
const bodyParser = require("body-parser");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConf = require("./webpack.config");

const app = express();
const compiler = webpack(webpackConf);

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/__build__/",
  stats: {
    colors: true,
    chunks: false
  }
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const router = express.Router();

// simple
router.get("/simple/get", (req, res) => {
  res.json({
    msg: "Hello World!"
  })
});
// base_get_url
router.get("/base_get_url/get", (req, res) => {
  res.json(req.query)
});
// request_body
router.post("/request_body/post", (req, res) => {
  res.json(req.body)
})
router.post("/request_body/buffer", (req, res) => {
  let msg = [];
  req.on("data", (chunk) => {
    if (chunk) {
      msg.push(chunk);
    }
  })
  req.on("end", () => {
    let buf = Buffer.concat(msg);
    res.json(buf.toJSON())
  })
})
// headers
router.post("/headers/post", (req, res) => {
  res.json(req.body)
})
router.post("/headers/contentType", (req, res) => {
  res.json(req.body)
})
router.post("/headers/searchParams", (req, res) => {
  res.json(req.body)
})
// response_promise
router.post("/response_promise/post", (req, res) => {
  res.json(req.body)
})
// error
router.get("/error/get", (req, res) => {
  if (Math.random() > 0.5) {
    res.json({
      msg: `HELLO WORLD!!`
    })
  } else {
    res.status(500)
    res.end()
  }
})
router.get("/error/timeout", (req, res) => {
  setTimeout(() => {
    res.json({
      msg: `hello world!!`
    })
  }, 3000)
})

// extend
router.get("/extend/get", (req, res) => {
  res.end()
})
router.delete("/extend/delete", (req, res) => {
  res.end()
})
router.head("/extend/head", (req, res) => {
  res.end()
})
router.options("/extend/options", (req, res) => {
  res.end()
})
router.post("/extend/post", (req, res) => {
  res.json(req.body)
})
router.put("/extend/put", (req, res) => {
  res.json(req.body)
})
router.patch("/extend/patch", (req, res) => {
  res.json(req.body)
})

// interceptors
router.get("/interceptor/get", (req, res) => {
  res.end()
})

app.use(router);

const port = process.env.PORT || 8080;

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port},Ctrl+C to stop`);
})
