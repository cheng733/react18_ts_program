const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const webpack = require('webpack')
const resolve = p => path.resolve(__dirname, p)
const isDEV = process.env.NODE_ENV === 'development'
module.exports = {
  entry: resolve('../src/index.tsx'),
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: resolve('../dist'),
    clean: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        // include:[resolve('../src')],
        test: /.(ts|tsx)$/,
        use: ['thread-loader', 'babel-loader']
      },
      {
        test: /.(css|less)$/,
        use: [isDEV?'style-loader':MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader", 'less-loader']
      },
      {
        test: /.(ts|tsx)$/,
        use: 'babel-loader',
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/,
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/fonts/[name][ext]', // 文件输出目录和命名
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/media/[name][ext]', // 文件输出目录和命名
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias:{
      "@":resolve('../src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      inject: true
    }),
    new webpack.DefinePlugin({
      'BASE_ENV': JSON.stringify(process.env.BASE_ENV),
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  cache: {
    type: "filesystem"
  }
}