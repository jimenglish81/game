var _ = require('lodash');
var convertToKarmaWebpack = function(config) {
  return _.assign({}, config, {
    devtool: 'inline-source-map',
    entry: {},
    output: {}
  });
};
var webpackConfig = convertToKarmaWebpack(require('./webpack.conf.js'));

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'test/**/*.test.js'
    ],
    preprocessors: {
      'test/**/*.js': ['webpack']
    },
    plugins: ['karma-*'],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DISABLE,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
