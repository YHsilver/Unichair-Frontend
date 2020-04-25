module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? 'http://114.115.246.37:80/' : 'http://localhost:81/',
  devServer: {
    open: false, //配置自动启动浏览器
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