/*
 * @Author: zhangzhiwei
 * @Date: 2024-12-09 13:47:28
 * @LastEditors: zhangzhiwei
 * @LastEditTime: 2024-12-09 15:45:59
 * @Description:
 * Copyright (c) 2024 by 朗新科技, All Rights Reserved.
 */
const path = require("path");
const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const common = require("../config/common.js");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.jsx"),
  output: {
    clean: true, // 在生成文件之前清空 output 目录(webpack4需要配置 clean-webpack-plugin 删除, webpack5 内置了)
    path: path.resolve(__dirname, "../dist"), // 打包后的代码放在dist目录下
    filename: "[name].[chunkhash:8].bundle.js", // 打包的文件名
    publicPath: process.env.RUN_ENV === "dev" ? "/" : common.contextPath, // 打包后文件的公共前缀路径
  },
  stats: "errors-only", // 只在发生错误或有新的编译时输出
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              // "@babel/preset-typescript",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 如果大于或等于这个值, 则按照相应的文件名和路径打包成图片
            // 如果小于这个值, 则将图片转成 base64 格式的字符串
            maxSize: 25 * 1024, // 最大值: 25 kb
          },
        },
        generator: {
          // imgs: 图片打包的文件夹
          // [name].[ext]: 设定图片按照本来的文件名和扩展名打包, 不用进行额外编码
          // [contenthash:8]: 一个项目中如果两个文件夹中的图片重名, 打包图片就会被覆盖, 加上hash值的前八位作为图片名, 可以避免重名
          filename: "assets/images/[name].[contenthash:8][ext]",
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[contenthash:8][ext][query]",
        },
      },
    ],
  },
  resolve: {
    // 配置 extensions 来告诉 webpack 在没有书写后缀时, 以什么样的顺序去寻找文件
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx"], // 如果项目中只有 tsx 或 ts 可以将其写在最前面

    // 创建 import 的别名, 来确保模块引入变得更简单（可以直接导入别名, 而不需要写长长的地址）
    alias: {
      ROOT: path.resolve(__dirname, ".."), // 根目录
      "@": path.resolve(__dirname, "../src"), // src 目录
      "@pages": path.resolve(__dirname, "../src/pages"), // src/pages 目录
    },
    fallback: {
      child_process: false,
    },
  },
  plugins: [
    new WebpackBar(), // 显示打包进度
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: common.title,
      template: path.resolve(__dirname, "../src/index.html"), // 使用自定义模板
      favicon: path.resolve(__dirname, common.favicon),
    }),
    // 复制 public 文件夹下的内容到打包根目录
    new CopyPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.RUN_ENV": JSON.stringify(process.env.RUN_ENV), // 运行环境: dev/test/pre/prod
    }),
    new NodePolyfillPlugin(), // 重新添加对 Node.js 核心模块的支持
  ],
};
