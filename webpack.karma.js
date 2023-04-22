/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  output: {
    pathinfo: true
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@test': path.resolve(__dirname, './test')
    }
    /**
     * Polyfill Node.js util module which is used by sinon
     *
     * @see https://stackoverflow.com/a/64580815
     */
    // fallback: {
    //   util: require.resolve('util/')
    // }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        RUN_ENV: JSON.stringify(process.env.RUN_ENV)
      }
    })
  ],
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
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS,
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  }
}
