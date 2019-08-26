process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  assetsDir: 'static',
  filenameHashing: false,
  crossorigin: 'anonymous',
  devServer: {
    proxy: {
      '^/api': {
        target: '<url>',
        changeOrigin: true,
        cookieDomainRewrite: ''
      }
    }
  }
};
