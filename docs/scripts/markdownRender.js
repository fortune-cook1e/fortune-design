/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
const markdownRenderer = require('react-code-view/webpack-md-loader/renderer')
const kebabCase = require('lodash/kebabCase')

function getId(text) {
  let _text = text.replace(/[\(|\)|（|）]/gi, ' ')
  let id = kebabCase(_text)

  return id
}

module.exports = function renderer(languages) {
  const renderer = markdownRenderer(languages)
  // Rewrite heading parsing for PageNav navigation
  renderer.heading = function (text, level) {
    let id = getId(text)

    return `
            <h${level} id="${id}" class="page-heading">
              <span class="page-heading-text">${text}</span>
              <a href="#${id}" class="page-heading-anchor" aria-hidden="true"><span aria-hidden="true">#</span></a>
            </h${level}>`
  }
  return renderer
}
