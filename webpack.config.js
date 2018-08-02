const path = require('path');
module.exports = {
  devtool: "source-map",
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'env', 'react']
        }
      }
    ]
  }
};
