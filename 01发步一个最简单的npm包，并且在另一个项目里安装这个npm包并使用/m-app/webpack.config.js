module.exports = {
  mode: 'development',
  entry: './main.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  }
}