module.exports = function(grunt) {
  grunt.config.merge({
    jscs: {
      src: 'lib/**/*.js',
      options: {
        config: '.jscsrc'
      }
    }
  });
};
