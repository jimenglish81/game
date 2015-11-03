module.exports = function(grunt) {
  grunt.config.merge({
    esdoc: {
      dist: {
        options: {
          source: './lib/',
          destination: './docs'
        }
      }
    }
  });
};
