module.exports = function(grunt) {
  grunt.config.merge({
    karma: {
      spec: {
        configFile: 'grunt/karma.conf.js',
        singleRun: true
      },
      watch: {
        configFile: 'grunt/karma.watch.conf.js',
        singleRun: false
      }
    },
    webpack: {
      build: require('./grunt/webpack.prod.conf.js'),
      test: require('./grunt/webpack.test.conf.js')
    }
  });
};
