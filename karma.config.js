/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * @param {import('karma').Config} config
 */
module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai-dom', 'sinon-chai', 'webpack'],
    files: ['test/setupTest.js'],
    basePath: '',
    preprocessors: {
      'test/setupTest.js': ['webpack'],
      'src/**/*.spec.+(js|ts|tsx)': ['webpack']
    },
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-chai-dom',
      'karma-sinon-chai',
      'karma-spec-reporter',
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
    },
    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  })
}
