const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'hidden-source-map',
  entry: [
    'babel-polyfill',
    './src/Index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loader: 'style!css!cssnext' },
      { test: /\.scss$/, loader: 'style!css!sass?outputStyle=expanded' },
      { test: /\.woff\d{0,1}(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?' +
      'limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    ],
  },
};
