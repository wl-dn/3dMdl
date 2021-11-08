/*
 * @Descripttion: 
 * @Author: wenlong
 * @version: 
 * @Date: 2021-05-21 09:36:42
 * @LastEditors: wenlong
 * @LastEditTime: 2021-08-23 09:23:56
 */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? '/earth/' : './',
    publicPath: "./",
    assetsDir: 'static', // 将所有静态文件集成在static中
    outputDir: "vue-cesium",
    lintOnSave: false,
    filenameHashing: false,
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.plugin('define').tap(args => {
            // 说明生成和开发环境下不同引用的路径
            args[0].CESIUM_BASE_URL = JSON.stringify(process.env.NODE_ENV === 'production' ? 'earth/static' : 'static')
            return args
        })
        config.resolve.alias
            .set('@', resolve('src'))
    },
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        }
    },
    configureWebpack: {
        plugins: [new CopyPlugin([
            { from: 'node_modules/cesium/Build/Cesium/Assets', to: 'static/Assets' },
            { from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'static/Widgets' },
            { from: 'node_modules/cesium/Build/Cesium/Workers', to: 'static/Workers' },
            { from: 'src/assets', to: 'assets' }
        ])]
    }
}