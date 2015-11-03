module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  require('./build/clean')(grunt);
  require('./build/esdoc')(grunt);
  require('./build/jscs')(grunt);
  require('./build/jshint')(grunt);
  require('./build/webpack')(grunt);

  grunt.file.expand('node_modules/grunt-*/tasks').forEach(grunt.loadTasks);

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['clean', 'jshint', 'jscs', 'webpack']);
  grunt.registerTask('prod', ['build', 'esdoc']);
};
