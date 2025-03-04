const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production', // 生产模式
  module: {
    rules: [
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /.less$/,
        exclude: /node_modules/, // 排除 node_modules 目录
        use: [
          MiniCssExtractPlugin.loader, // 生产环境, 使用 MiniCssExtractPlugin.loader 代替 style-loader, 提取 CSS 到单独的文件中
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；
              // 也包括会自动帮助我们添加 autoprefixer
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]],
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin({
        // 默认开启
        // parallel true:  // 多进程并发执行，提升构建速度 。 运行时默认的并发数：os.cpus().length - 1
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css', // 将 css 单独提测出来放在 css 下
    }),
  ],
});
