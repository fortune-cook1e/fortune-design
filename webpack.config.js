/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const resolve = dir => path.resolve(__dirname, dir)
const filename = isDev ? '[name].js' : '[name].min.js'

module.exports = {
  entry: {
    fortune: resolve('src')
  },
  output: {
    path: resolve('lib/dist'),
    filename,
    library: 'fortune-design',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts|tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}
