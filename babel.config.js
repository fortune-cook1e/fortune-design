module.exports = (api, options) => {
  const { NODE_ENV } = options || process.env
  const dev = NODE_ENV === 'development'
  const modules = NODE_ENV === 'esm' ? false : 'commonjs'

  if (api) {
    api.cache(() => NODE_ENV)
  }

  return {
    presets: [
      ['@babel/preset-env', { modules }],
      ['@babel/preset-react'],
      '@babel/preset-typescript'
    ],
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
  }
}
