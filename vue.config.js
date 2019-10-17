// vue.config.js
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const packageJson = require('./package.json');
process.env.VUE_APP_VERSION = packageJson.version;
process.env.VUE_APP_APP_VERSION = packageJson.appVersion;
const baseUrl = '';
const filenameHashing = false;

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? baseUrl : '',
  assetsDir: 'static',
  filenameHashing: filenameHashing,
  transpileDependencies: [/(\/|\\)vuetify(\/|\\)/],
  crossorigin: 'anonymous',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/variables.scss"',
        implementation: require('sass')
      }
    }
  },
  devServer: {
    proxy: {
      '^/spi/': {
        target: 'http://abc.com:8080',
        changeOrigin: true,
        cookieDomainRewrite: ''
      },
      '^/group[0-9]|app/': {
        target: 'https://abc.com',
        changeOrigin: true,
        cookieDomainRewrite: ''
      }
    }
  },
  chainWebpack: config => {
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(match => {
      config.module
        .rule('scss')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt => Object.assign(opt, { prependData: '@import "~@/styles/variables.scss";' }));
    });
    config.plugin('copy').tap(args => {
      args[0][0].transform = function(content, path) {
        if (path.endsWith('.js') || path.endsWith('.json')) {
          return content
            .toString()
            .replace('process.env.VUE_APP_VERSION', process.env.VUE_APP_VERSION)
            .replace('process.env.VUE_APP_APP_VERSION', process.env.VUE_APP_APP_VERSION);
        }
        return content;
      };
      return args;
    });
    config.plugin('html').tap(args => {
      const opts = [...args];
      opts[0].minify = {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true
      };
      return opts;
    });
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    if (process.env.NODE_ENV === 'production') {
      config.optimization.runtimeChunk({ name: 'runtime' }).splitChunks({
        maxInitialRequests: 5,
        cacheGroups: {
          vue: {
            name: 'chunk-vue',
            test: /[\\/]node_modules[\\/](vue|vuex|vue-router|vue-i18n|vue-loader|localforage)[\\/]/,
            priority: 1000,
            chunks: 'initial'
          },
          vuetify: {
            name: 'chunk-vuetify',
            test: /[\\/]node_modules[\\/]vuetify/,
            priority: 100,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            test: /[\\/]node_modules[\\/](axios|@mdi|core-js|crypto-js|process|regenerator-runtime|@babel|agentkeepalive|tslib|lodash)[\\/]/,
            priority: 10,
            chunks: 'initial',
            reuseExistingChunk: true
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      });
      config.plugin('manifest').use(ManifestPlugin);
      config.plugin('analyzer').use(new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: !process.env.CI }));
    }
  }
};
