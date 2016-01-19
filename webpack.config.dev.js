const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/Index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css'),
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      { test: /\.css$/, loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[path][name]---[local]---[hash:base64:5]',
        'cssnext',
      ]},
      { test: /\.scss$/, loader: 'style!css!sass?outputStyle=expanded' },
      { test: /\.woff\d{0,1}(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    ],
  },
};
