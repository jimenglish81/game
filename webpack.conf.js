module.exports = {
  entry: './lib/main.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.(js)$/
      }
    ]
  },
  // resolve: {
  //   alias: {
  //     'backbone-events-standalone': '../node_modules/backbone-events-standalone',
  //     bluebird: '../node_modules/bluebird',
  //     lodash: '../node_modules/lodash'
  //   }
  // },
  stats: {
    colors: true
  },
  devtool: 'source-map',
};
