const { merge } = require("webpack-merge");
const prodConfig = require('./webpack.prod')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const smp = new SpeedMeasurePlugin()
module.exports = smp.wrap(merge(prodConfig,{
    plugins:[
        new BundleAnalyzerPlugin()
    ]
}))