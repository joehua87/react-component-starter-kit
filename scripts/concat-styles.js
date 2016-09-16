const path = require('path')
const glob = require('glob')
const fs = require('fs')

const dirPath = path.resolve(`${__dirname}`, '../lib-css')
const pattern = `${dirPath}/styles__*.css`

const filePaths = glob.sync(pattern)

const fileContent = filePaths
  .map((filePath) => fs.readFileSync(filePath, 'utf8'))
  .join('\n')

fs.writeFileSync(`${dirPath}/styles.css`, fileContent)
