module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png)$/,
        loader: 'url-loader'
      }
    ]
  }
}
