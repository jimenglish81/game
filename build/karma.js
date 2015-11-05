module.exports = function(grunt) {
  grunt.config.merge({
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });
};

//new webpack.optimize.UglifyJsPlugi
