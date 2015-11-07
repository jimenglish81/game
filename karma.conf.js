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
    basePath: '.',
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'lib/vector.js', watched: false },
      'test/**/*.test.js'
    ],
    preprocessors: {
      'lib/**/*.js': ['coverage'],
      'test/**/*.js': ['webpack']
    },
    plugins: ['karma-*'],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    coverageReporter: {
      instrumenterOptions: {
        istanbul: { esModules: true }
      },
      type : 'html',
      dir : 'coverage/'
    },
    logLevel: config.LOG_DISABLE,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
