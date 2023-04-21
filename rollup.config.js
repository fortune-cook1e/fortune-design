import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { readFileSync } from 'fs'
import * as path from 'path'
import dts from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
// import postcss from 'rollup-plugin-postcss'
// import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

const resolveDir = dir => path.resolve(__dirname, dir)

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']
const ROOT_DIR = resolveDir('./src')
const entry = resolveDir('./src/index.ts')
const __DEV__ = process.env.NODE_ENV === 'development'

const fileName = __DEV__ ? '[name].js' : '[name.min.js]'

const baseConfig = {
  // output: {
  //   sourcemap: false,
  //   externalLiveBindings: false
  // },
  plugins: [
    peerDepsExternal(),
    commonjs(),
    resolve({
      extensions: EXTENSIONS
    }),
    typescript({ useTsconfigDeclarationDir: true }),
    babel({
      // babelrc: true,
      babelHelpers: 'runtime',
      extensions: EXTENSIONS,
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env'], ['@babel/preset-react'], '@babel/preset-typescript'],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: {
              // 注意，要安装@babel/runtime-corejs3的包
              version: 3,
              proposals: true
            }
          }
        ]
      ]
    }),
    alias({
      resolve: EXTENSIONS,
      entries: [
        {
          find: '@',
          replacement: ROOT_DIR
        }
      ]
    }),
    json()
    // postcss({
    //   extract: true,
    //   minimize: !__DEV__,
    //   modules: false,
    //   extensions: ['.less', '.css']
    // })
  ]
}

// 编译组件
const componentConfig = {
  ...baseConfig,
  input: entry,
  output: {
    file: 'lib/bundle.js',
    format: 'cjs'
  },
  plugins: [...baseConfig.plugins]
}

// 编译类型
const typesOption = {
  ...baseConfig,
  input: entry,
  output: {
    ...baseConfig.output,
    file: 'lib/esm/index.d.ts',
    format: 'esm'
  },
  plugins: [...baseConfig.plugins, dts.default()]
}

export default [componentConfig, typesOption]
