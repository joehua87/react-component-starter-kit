/* eslint-disable global-require */

const path = require('path')

module.exports = () => [
  require('postcss-import')({
    path: path.join(__dirname, 'src', 'theme'),
  }),
  require('postcss-cssnext')({
    browsers: ['> 1%', 'last 2 versions'],
  }),
  require('postcss-reporter')({ clearMessages: true }),
]
