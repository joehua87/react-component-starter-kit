const path = require('path')

const postCSSConfig = (webpack) => [
  require('postcss-import')({
    path: path.join(__dirname, '..', 'src', 'theme'),
    addDependencyTo: webpack // for hot-reloading
  }),
  require('postcss-cssnext')({
    browsers: ['> 1%', 'last 2 versions'],
  }),
  require('postcss-reporter')({ clearMessages: true }),
]

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.css?$/,
        loaders: [
          'style-loader',
          'css-loader',
        ],
        include: /node_modules/,
      },
      {
        test: /\.json/,
        loader: 'json-loader',
      },
    ],
    include: path.resolve(__dirname, '../'),
  },
  resolve: {
    modules: ['src', 'node_modules'],
    modulesDirectories: ['src', 'node_modules'],
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json',
      '.react.js',
    ],
  },
  postcss: postCSSConfig,
}
