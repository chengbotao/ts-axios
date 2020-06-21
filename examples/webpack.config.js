/*
 * @Description: webpack_config
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-22 06:24:35
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-22 07:33:29
 */

const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  /*
   * 在 examples 目录下创建多个子目录
   * 每个子目录创建一个 app.ts 作为 webpack 构建入口
   * entries 收集多个入口文件,并且每个入口引入一个用于热更新的文件
   */
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir);
    const entry = path.join(fullDir, "app.ts");
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ["webpack-hot-middleware/client", entry]
    }
    return entries;
  }, {}),

  /*
   * 根据不同的目录名称,打包生成目标 js, 名称和目标名一致
   */
  output: {
    path: path.join(__dirname, "__build__"),
    filename: "[name].js",
    publicPath: "/__build__/"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: "pre",
        use: [{
          loader: "tslint-loader"
        }]
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
