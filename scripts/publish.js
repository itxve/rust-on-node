const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const registry = process.env.registry || 'npm'

const registrys = {
  npm: 'https://registry.npmjs.org/',
  github: 'https://npm.pkg.github.com/',
}

// 替换发布仓库地址
function replace_registry(path, registry) {
  const content = JSON.parse(fs.readFileSync(path))
  content.publishConfig.registry = registry
  fs.writeFileSync(path, JSON.stringify(content, null, 2))
}

const directoryPath = path.join(__dirname, '..')
//替换主仓库地址
replace_registry(path.join(directoryPath, 'package.json'), registrys[registry])
// npm 目录下的地址
const npmDirectoryPath = path.join(directoryPath, 'npm')
Array.from(fs.readdirSync(npmDirectoryPath)).forEach((dir) => {
  replace_registry(path.join(npmDirectoryPath, dir, 'package.json'), registrys[registry])
})
//npai相关处理
execSync('yarn napi prepublish -t npm')
