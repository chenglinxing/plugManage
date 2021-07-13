const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
    return path.join(__dirname, dir)
}

webpack.HotModuleReplacementPlugin

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/plugfront/' : '/',
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@a", resolve("src/assets"))
            .set("@c", resolve("src/components"))
            .set("@v", resolve("src/views"))
            .set("@u", resolve("src/utils"))
            .set("@api", resolve("src/api"))
    },
    outputDir: 'plugfront',
    devServer: {
        open: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                wx: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },

    },
}