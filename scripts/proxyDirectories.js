/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Create a package.json for each directory and proxy to CJS and ESM files.
 * Can make importing a component easier.
 *
 * E.g:
 * import Button from 'fortune-design/Button';
 * import 'fortune-design/Button/styles/index.less';
 */

const { resolve, join } = require('path')
const fs = require('fs')
const util = require('util')

const mkDir = util.promisify(fs.mkdir)
const writeFile = util.promisify(fs.writeFile)

const srcRoot = join(__dirname, '../src')
const libRoot = join(__dirname, '../lib')

const PKG_NAME = 'fortune-design'

function findResources(options) {
  const { dir = srcRoot, ignores = [], isFile } = options
  const resources = []
  fs.readdirSync(dir).forEach(item => {
    const itemPath = resolve(dir, item)
    const pathname = itemPath.replace(/[-_a-z0-9]*\//gi, '').replace('.ts', '')
    if (fs.statSync(itemPath).isDirectory()) {
      resources.push(pathname)
    }
    if (isFile && fs.statSync(itemPath).isFile()) {
      resources.push(pathname)
    }
  })
  return resources.filter(item => !ignores.includes(item))
}

function proxyResource(options) {
  const { pkgName = PKG_NAME, name, file, filePath = '../' } = options
  const proxyPkg = {
    name: `${pkgName}/${name}`,
    private: true,
    main: `${filePath}/cjs/${file}.js`,
    module: `${filePath}/esm/${file}.js`,
    types: `${filePath}/esm/${file}.d.ts`
  }

  return JSON.stringify(proxyPkg, null, 2) + '\n'
}

async function writePkgFile(options) {
  const { resources = [], pkgName = PKG_NAME } = options
  await Promise.all(
    resources.map(async item => {
      const name = item
      const file = `${item}/index`
      const filePath = '..'
      const proxyDir = join(libRoot, name)
      await mkDir(libRoot).catch(() => {})
      await mkDir(proxyDir).catch(() => {})
      await writeFile(
        `${proxyDir}/package.json`,
        proxyResource({ pkgName, name, file, filePath })
      ).catch(err => {
        if (err) console.error(err.toString())
      })
    })
  )
}

/**
 * Use package.json file to proxy component directory
 *
 * outputs:
 * lib/Button/package.json
 * .....
 */
async function proxyComponent() {
  const resources = findResources({ dir: srcRoot, ignores: ['styles', '@types'] })

  await writePkgFile({ resources })
}

async function proxyComponentDirectories() {
  await proxyComponent()
}

module.exports = {
  findResources,
  proxyComponentDirectories
}
