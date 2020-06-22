/*
 * @Description: server
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 06:54:03
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 13:30:13
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

app.use(router);

const port = process.env.PORT || 8080;

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port},Ctrl+C to stop`);
})
