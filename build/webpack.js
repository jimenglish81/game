var path = require('path');

module.exports = function(grunt) {
  grunt.config.merge({
    webpack: {
      build: {
        entry: './lib/main.js',
        output: {
          path: './dist',
          filename: 'bundle.js'
        },
        module: {
          loaders: [
            {
              loader: 'babel-loader',
              query: {
                presets: ['es2015']
              },
              test: /\.(js)$/
            }
          ]
        },
        resolve: {
          alias: {
            'backbone-events-standalone': '../node_modules/backbone-events-standalone',
            lodash: '../node_modules/lodash'
          }
        },
        stats: {
          colors: true
        },
        devtool: 'source-map',
      }
    }
  });
};
