var webpackConfig = require('../webpack.conf.js');

module.exports = function(grunt) {
  grunt.config.merge({
    webpack: {
      build: webpackConfig
    }
  });
};
