/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')
const fs = require('fs')
const util = require('util')
const { rimrafSync } = require('rimraf')
const { src, dest, series, parallel, watch } = require('gulp')
const babel = require('gulp-babel')
const less = require('gulp-less')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const { proxyComponentDirectories } = require('./proxyDirectories')
const pkg = require('../package.json')

const postcssPresetEnv = require('postcss-preset-env')
const sourcemaps = require('gulp-sourcemaps')
const babelConfig = require('../babel.config')
const resolve = dir => path.resolve(__dirname, dir)
const writeFile = util.promisify(fs.writeFile)

const dirRoot = {
  src: resolve('../src'),
  lib: resolve('../lib'),
  esm: resolve('../lib/esm'),
  cjs: resolve('../lib/cjs'),
  dist: resolve('../lib/dist'),
  styles: resolve('../src/styles')
}

const tsSources = [
  `${dirRoot.src}/**/*.tsx`,
  `${dirRoot.src}/**/*.ts`,
  `!${dirRoot.src}/**/*.d.ts`,
  `!${dirRoot.src}/**/test/*`
]

function clean(done) {
  rimrafSync(dirRoot.lib)
  done()
}

function buildCjs() {
  return src(tsSources).pipe(babel(babelConfig())).pipe(dest(dirRoot.cjs))
}

function buildEsm() {
  return src(tsSources)
    .pipe(
      babel(
        babelConfig(null, {
          NODE_ENV: 'esm'
        })
      )
    )
    .pipe(dest(dirRoot.esm))
}

function buildLess() {
  return src(`${dirRoot.styles}/index.less`)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([require('postcss-preset-env')]))
    .pipe(sourcemaps.write('./'))
    .pipe(rename('fortune.css'))
    .pipe(dest(dirRoot.dist))
}

function minifyCss() {
  return src(`${dirRoot.dist}/fortune*.css`)
    .pipe(sourcemaps.init())
    .pipe(postcss([cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(dirRoot.dist))
}

// src 的 styles 文件进行复制
// src/Button/styles -> lib/Button/styles
function copyLessStylesheets() {
  return src(`${dirRoot.src}/**/*.less`).pipe(dest(dirRoot.lib))
}

function copyDocs() {
  return src(['../README.md', '../LICENSE']).pipe(dest(dirRoot.lib))
}

// 创建 lib 文件夹下的 package.json 文件
function createPkgFile(done) {
  delete pkg.devDependencies
  delete pkg.files

  pkg.main = 'cjs/index.js'
  pkg.module = 'esm/index.js'
  pkg.types = 'esm/index.d.ts'

  writeFile(`${dirRoot.lib}/package.json`, JSON.stringify(pkg, null, 2) + '\n')
    .then(() => {
      done()
    })
    .catch(err => {
      if (err) console.error(err.toString())
    })
}

function watchFiles() {
  const watcher = watch(tsSources)
  watcher.on('change', filePath => {
    console.log('File ' + filePath + ' was changed, running tasks...')
    const cjsPath = filePath.replace('src/', 'cjs/').replace(/\/[a-z|A-Z]+.(tsx|ts)/, '')

    return src(filePath).pipe(babel(babelConfig())).pipe(dest(cjsPath))
  })
}

// exports.dev = series(clean, buildCjs, watchFiles)
exports.build = series(
  clean,
  parallel(buildCjs, buildEsm, buildLess, copyLessStylesheets),
  parallel(minifyCss, copyDocs, createPkgFile, proxyComponentDirectories)
)
