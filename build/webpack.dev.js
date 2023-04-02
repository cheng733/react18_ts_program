const { merge } = require("webpack-merge");
const baseConfig  = require('./webpack.base')
const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)
module.exports = merge(baseConfig,{
    mode:"development",
    devtool:"eval-cheap-module-source-map",
    devServer:{
        port:3000,
        compress:false,
        hot:true,
        historyApiFallback:true,
        static:{
            directory:path.join(__dirname,'../public')
        }
    },
    plugins:[
        new ReactRefreshWebpackPlugin()
    ]
})