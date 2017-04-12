/* eslint-disable no-var, global-require */
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2', // necessary for the babel plugin
    path: path.join(__dirname, 'lib-css'), // where to place webpack files
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[path][local]__[hash:base64:5]!postcss-loader',
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles__[contenthash].css'),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.react.js',
    ],
  },
}
