/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')
const { rimrafSync } = require('rimraf')
const { src, dest, pipe, series, parallel } = require('gulp')
const babel = require('gulp-babel')
const less = require('gulp-less')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')

const postcssPresetEnv = require('postcss-preset-env')
const sourcemaps = require('gulp-sourcemaps')
const babelConfig = require('../babel.config')
const resolve = dir => path.resolve(__dirname, dir)

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

function buidCjs() {
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

exports.build = series(clean, parallel(buidCjs, buildEsm, buildLess), minifyCss)
