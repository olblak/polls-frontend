module.exports = {
  // https://cli.vuejs.org/config/#vue-config-js
  proxyTable: {
    // proxy all requests starting with /api to jsonplaceholder
    '/api': {
      target: 'http://127.0.0.1:8081/',
      changeOrigin: true,
      pathRewrite: {
        '^/': ''
      }
    }
  }
}
