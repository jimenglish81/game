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
  stats: {
    colors: true
  },
  devtool: 'source-map',
};
