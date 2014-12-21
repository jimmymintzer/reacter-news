module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: 'http://localhost:8090/js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'jsx-loader?harmony'] },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};