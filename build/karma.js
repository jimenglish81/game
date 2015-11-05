var path = require('path');
module.exports = function(grunt) {
  // grunt.config.merge({
  //   karma: {
  //     unit_test: {
  //       browsers: ['PhantomJS'],
  //       singleRun: true,
  //       plugins: ['karma-*'],
  //       frameworks: ['mocha', 'chai'],
  //       reporters: ['dots'],
  //       preprocessors: {
  //          'test.bundle.js': ['webpack']
  //         // 'test/*.test.js': ['webpack'],
  //         // '**/*.js': ['webpack']
  //       },
  //       basePath: '.',
  //       files: [
  //          { pattern: 'test.bundle.js', watched: false }
  //         // { src: ['test/unit/**/*.test.js'], included: true, watched: true },
  //         // { src: ['lib/**/*.js'], included: true, watched: true }
  //       ],
  //       webpack: {
  //         entry: './lib/main.js',
  //         module: {
  //           loaders: [
  //              { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' }
  //             // {
  //             //   loader: 'babel-loader',
  //             //   exclude: /node_modules/,
  //             //   query: {
  //             //     presets: ['es2015']
  //             //   },
  //             //   test: /\.(js)$/
  //             // }
  //           ]
  //         },
  //         webpackMiddleware: {
  //           noInfo: true,
  //         }
  //       }
  //     }
  //   }
  // });

  grunt.config.merge({
    karma: {
      singleRun: true,
      frameworks: ['mocha'],
      browsers: ['PhantomJS'],
      reporters: ['progress'],
      basePath: '.',
      files: [
        // all files ending in "_test
        { pattern: 'test/unit/*.test.js', included: false, served: false, watched: true }

        // each file acts as entry point for the webpack configuration
      ],

      preprocessors: {
        // add webpack as preprocessor
        'test/unit/*.test.js': ['webpack']
      },

      colors: true,

      webpack: {
        quiet: true,
        module: {
          loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
            }
          ]
        }
      },

      webpackMiddleware: {
        noInfo: true
      },

      plugins: ['karma-*'],
    }
  });
};

//new webpack.optimize.UglifyJsPlugi
