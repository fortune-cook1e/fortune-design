/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('next').NextConfig} */

const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const markdownRenderer = require('./scripts/markdownRender')

const resolvePath = dir => resolve(__dirname, dir)

const {
  // 'production' on main branch
  // 'preview' on pr branches
  // emtpy on local machine
  // @see https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
  VERCEL_ENV = 'local'
} = process.env

const __DEV__ = VERCEL_ENV === 'preview' || VERCEL_ENV === 'local'

const nextConfig = {
  env: {
    DEV: __DEV__ ? 1 : 0
  },
  experimental: {
    externalDir: true
  },
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.(le|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader'
        },
        {
          loader: 'postcss-loader'
        },
        {
          loader: 'less-loader'
          // options: {
          //   sourceMap: true,
          //   lessOptions: {
          //     globalVars: {
          //       rootPath: __DEV__ ? '../../../src/' : '~fortune-design'
          //     }
          //   }
          // }
        }
      ]
    })

    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: 'react-code-view/webpack-md-loader',
          options: {
            parseLanguages: [
              'typescript',
              'rust',
              'javascript',
              'bash',
              'xml',
              'css',
              'less',
              'json',
              'diff'
            ]
            // markedOptions: {
            //   renderer: markdownRenderer([
            // 'javascript',
            // 'bash',
            // 'xml',
            // 'css',
            // 'less',
            // 'json',
            // 'diff',
            // 'typescript'
            //   ])
            //   // Pass options to marked
            //   // See https://marked.js.org/using_advanced#options
            // }
          }
        }
      ]
    })

    config.plugins.push(
      new MiniCssExtractPlugin({
        experimentalUseImportModule: true, // isWebpack5
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[contenthash].css'
      })
    )

    if (__DEV__) {
      Object.assign(config.resolve.alias, {
        'fortune-design': resolvePath('../src'),
        react: resolvePath('./node_modules/react'),
        'react-dom': resolvePath('./node_modules/react-dom')
      })
    }

    return config
  },
  // trailingSlash: true,
  // onDemandEntries: {
  //   // Period (in ms) where the server will keep pages in the buffer
  //   maxInactiveAge: 120 * 1e3, // default 25s
  //   // Number of pages that should be kept simultaneously without being disposed
  //   pagesBufferLength: 3 // default 2
  // },

  pageExtensions: ['tsx'],
  typescript: {
    tsconfigPath: __DEV__ ? './tsconfig.local.json' : './tsconfig.json'
  }
}

module.exports = nextConfig
