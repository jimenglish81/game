module.exports = function(grunt) {
  grunt.config.merge({
    clean: {
      build: {
        src: ['./coverage', './dist', './docs']
      }
    }
  });
};
