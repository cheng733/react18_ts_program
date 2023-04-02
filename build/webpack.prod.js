const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const baseConfig = require('./webpack.base')
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const resolve = key => path.resolve(__dirname, key)
module.exports = merge(baseConfig, {
    mode: "production",
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: resolve('../public'),
                to: resolve('../dist'),
                filter: source => {
                    return !source.includes('index.html')
                }
            }]
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css"
        }),
        new CompressionPlugin({
            test: /.(js|css)$/,
            filename: '[path][base].gz',
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        pure_funcs: ["console.log"]
                    }
                }
            })
        ],
        splitChunks: { // 分隔代码
            cacheGroups: {
                vendors: { // 提取node_modules代码
                    test: /node_modules/, // 只匹配node_modules里面的模块
                    name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
                    minChunks: 1, // 只要使用一次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                    priority: 1, // 提取优先级为1
                },
                commons: { // 提取页面公共代码
                    name: 'commons', // 提取文件命名为commons
                    minChunks: 2, // 只要使用两次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                }
            }
        }
    }
})