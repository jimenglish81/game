var adjustWebpackConfig = function(config) {
  // Change sourcemap type
  config.devtool = 'inline-source-map';

  // Remove the entry point
  config.entry = {};
  // Remove the entry point
  config.output = {};

  return config;
};

// Load webpack config
var webpackConfig = adjustWebpackConfig(require('./webpack.config.js'));

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
    //webpack: webpackConfig,
     webpack: {
     module: {
         loaders: [{
           test: /.js$/,
         loader: 'babel-loader'
         }]
       }
    },
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
