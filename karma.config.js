/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * @param {import('karma').Config} config
 */
module.exports = function (config) {
  config.set({
    // frameworks: ['mocha', 'chai-dom', 'sinon-chai', 'webpack'],
    frameworks: ['mocha', 'chai', 'webpack'],
    files: ['src/**/*.spec.+(ts|tsx)'],
    basePath: '',
    preprocessors: {
      'test/setupTestUtils.js': ['webpack'],
      'src/**/*.spec.+(js|ts|tsx)': ['webpack']
    },
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-mocha-reporter'
    ],
    logLevel: config.DEBUG,
    reporters: ['mocha', 'coverage'],
    browsers: ['Chrome'],
    singleRun: true,
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json'
    },
    webpack: require('./webpack.karma.js'),
    webpackMiddleware: {
      noInfo: true
    }
    // customLaunchers: {
    //   ChromeCi: {
    //     base: 'Chrome',
    //     flags: ['--no-sandbox']
    //   }
    // }
  })
}
