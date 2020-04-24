module.exports = {
  productionSourceMap: false,
  configureWebpack: () => ({
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100,
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true,
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      }
    }
  }),
  devServer: {
    open: true, //配置自动启动浏览器
    // host: 'localhost',
    port: 80,
    proxy: {
      '/api': {
        // 只用在这里修改就可以本地/服务器
        target: 'http://114.115.246.37:8080',
        // target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true,//是否代理websocket
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  }
}