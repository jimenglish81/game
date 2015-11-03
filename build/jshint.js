module.exports = function(grunt) {
  grunt.config.merge({
    jshint: {
      src: ['lib/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });
};
