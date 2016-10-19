/* eslint-disable no-var, global-require */
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const postCSSConfig = () => [
  require('postcss-import')({
    path: path.join(__dirname, 'src', 'theme'),
  }),
  require('postcss-cssnext')({
    browsers: ['> 1%', 'last 2 versions'],
  }),
  require('postcss-reporter')({ clearMessages: true }),
]

const exposedComponents = [
  'Item',
]

function createLoaders() {
  return exposedComponents.map((name) => ({
    test: new RegExp(`${name}/.*?.js$`),
    loaders: [`expose?${name}`, 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'],
    exclude: /node_modules/,
  }))
}

module.exports = {
  entry: [
    'index.js',
  ],
  output: {
    path: 'build',
    publicPath: 'build',
    filename: 'app.js',
    // libraryTarget: 'web', // necessary for the babel plugin
  },
  module: {
    loaders: createLoaders().concat([
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[path][local]__[hash:base64:5]!postcss-loader',
        }),
      },
    ]),
  },
  postcss: postCSSConfig,
  plugins: [
    new ExtractTextPlugin('styles__[contenthash].css'),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
    modulesDirectories: ['src', 'node_modules'],
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json',
      '.react.js',
    ],
  },
}
