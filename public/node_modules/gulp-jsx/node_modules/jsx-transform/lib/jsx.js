/*!
 * jsx-transform
 * https://github.com/alexmingoia/jsx-transform
 */
/**
 * This module aims to be a standard and configurable implementation of JSX
 * decoupled from {@link https://github.com/facebook/react|React}.
 *
 * For linting files containing JSX see
 * {@link https://github.com/STRML/JSXHint|JSXHint}.
 *
 * @module jsx-transform
 */

'use strict';

var fs = require('fs');
var jstransform = require('jstransform').transform;
var visitNode = require('./visitor');

/**
 * Desugar JSX and return transformed string.
 *
 * Known tags are passed as arguments to JSX ident (assume
 * `@jsx Element`):
 *
 *   `<div class="blue"></div>` => `Element('div', { class: 'blue' })`
 *
 * Unknown tags are assumed to be function names in scope:
 *
 *   `<FrontPage class="blue"></FrontPage>` => `FrontPage({ class: 'blue' })`
 *
 * If `options.docblockUnknownTags` is `true` unknown tags are passed to the
 * docblock ident:
 *
 *   `<FrontPage></FrontPage>` => `Element(FrontPage, ...)`
 *
 * @param {String} str
 * @param {Object=} options
 * @param {Boolean=} options.ignoreDocblock Parse files without docblock. If
 * true `options.jsx` must also be set.
 * @param {Object=} options.renameAttrs rename attributes while desugaring JSX
 * (i.e. `class` to `className`).
 * @param {Array=} options.tags list of known tags (default: exports.tags)
 * @param {Boolean=} options.tagMethods use tag name as method of jsx ident
 * instead of argument. If true `DOM.h1()` instead of `DOM("h1")`.
 * @param {Boolean=} options.docblockUnknownTags Handle unknown tags like
 * known tags, and pass them as an object to docblock ident. (default: false)
 * @param {String} options.jsx Constructor name (default: set by docblock).
 * @returns {String}
 */
function transform(str, options) {
  return jstransform([visitNode], str, options || {}).code;
}

/**
 * See {@link module:jsx-transform.transform} for usage.
 *
 * @param {String} path
 * @param {Object} options
 * @returns {String}
 */
function transformFile(path, options) {
  return transform(fs.readFileSync(path, 'utf8'), options || {});
}

module.exports = {
  transform: transform,
  transformFile: transformFile,
  tags: require('./tags'),
  visitor: visitNode
};