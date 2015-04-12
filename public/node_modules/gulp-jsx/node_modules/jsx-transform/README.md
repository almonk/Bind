# jsx-transform [![Build Status](http://img.shields.io/travis/alexmingoia/jsx-transform.svg?style=flat)](http://travis-ci.org/alexmingoia/jsx-transform) [![NPM version](http://img.shields.io/npm/v/jsx-transform.svg?style=flat)](https://npmjs.org/package/jsx-transform) [![Dependency Status](http://img.shields.io/david/alexmingoia/jsx-transform.svg?style=flat)](http://david-dm.org/alexmingoia/jsx-transform)

> JSX transpiler. Desugar JSX into JavaScript.

This module aims to be a standard and configurable implementation of JSX
decoupled from [React](https://github.com/facebook/react).

For linting files containing JSX see
[JSXHint](https://github.com/STRML/JSXHint).

## Installation

```sh
npm install jsx-transform
```

## Example

### React

```jsx
/** @jsx react.createElement */

var profile = <div>
  <img src="avatar.png" class="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

Transformed into JS:

```javascript
var profile = react.createElement('div', null, [
  h('img', { src: "avatar.png", class: "profile" }),
  h('h3', null, [[user.firstName, user.lastName].join(' ')])
]);
```

### virtual-dom

```jsx
/** @jsx h */
var h = require('virtual-dom/h');

var profile = <div>
  <img src="avatar.png" class="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

```javascript
var h = require('virtual-dom/h');

var profile = h('div', null, [
  h('img', { src: "avatar.png", class: "profile" }),
  h('h3', null, [[user.firstName, user.lastName].join(' ')])
]);
```

## JSX

JSX is a JavaScript XML syntax.

### The Transform

Known tag names are passed as arguments to the ident specified by the `@jsx`
docblock:

`<div class="blue"></div>` => `virtualdom.h('div', { class: 'blue' })`

Unknown tags are assumed to be function names in scope:

`<FrontPage class="blue"></FrontPage>` => `FrontPage({ class: 'blue' })`

### docblock

Only files with the `/** @jsx DOM */` docblock will be parsed unless
`options.ignoreDocblock` is set. The constructor name is taken from the `@jsx`
definition.

```javascript
/** @jsx React.createElement */
<div>Hello World</div>
```

is desugared to

```javascript
React.createElement("div", null, ["Hello World"]);
```

### Expressions

Use JavaScript expressions as attribute values by wrapping the expression in a
pair of curly braces ({}) instead of quotes (""):

```jsx
<Profile class={state.isLoggedIn ? 'loggedIn' : 'loggedOut'}></Profile>
```

```javascript
Profile({ class: state.isLoggedIn ? 'loggedIn' : 'loggedOut' });
```

Expressions can also express children:

```jsx
<Profile>{ state.isLoggedIn ? <Settings /> : <CreateAccount /> }</Profile>
```

```javascript
Profile(null, [state.isLoggedIn ? Settings(null) : CreateAccount(null)]);
```

## API
**Members**

* [jsx-transform](#module_jsx-transform)
  * [jsx-transform~transform(str, [options])](#module_jsx-transform..transform)
  * [jsx-transform~transformFile(path, options)](#module_jsx-transform..transformFile)

<a name="module_jsx-transform..transform"></a>
##jsx-transform~transform(str, [options])
Desugar JSX and return transformed string.

Known tags are passed as arguments to JSX ident (assume
`@jsx Element`):

  `<div class="blue"></div>` => `Element('div', { class: 'blue' })`

Unknown tags are assumed to be function names in scope:

  `<FrontPage class="blue"></FrontPage>` => `FrontPage({ class: 'blue' })`

If `options.docblockUnknownTags` is `true` unknown tags are passed to the
docblock ident:

  `<FrontPage></FrontPage>` => `Element(FrontPage, ...)`

**Params**

- str `String`  
- \[options\] `Object`  
  - \[ignoreDocblock\] `Boolean` - Parse files without docblock. If
true `options.jsx` must also be set.  
  - \[renameAttrs\] `Object` - rename attributes while desugaring JSX
(i.e. `class` to `className`).  
  - \[tags\] `Array` - list of known tags (default: exports.tags)  
  - \[tagMethods\] `Boolean` - use tag name as method of jsx ident
instead of argument. If true `DOM.h1()` instead of `DOM("h1")`.  
  - \[docblockUnknownTags\] `Boolean` - Handle unknown tags like
known tags, and pass them as an object to docblock ident. (default: false)  
  - jsx `String` - Constructor name (default: set by docblock).  

**Scope**: inner function of [jsx-transform](#module_jsx-transform)  
**Returns**: `String`  
<a name="module_jsx-transform..transformFile"></a>
##jsx-transform~transformFile(path, options)
See [module:jsx-transform.transform](module:jsx-transform.transform) for usage.

**Params**

- path `String`  
- options `Object`  

**Scope**: inner function of [jsx-transform](#module_jsx-transform)  
**Returns**: `String`  


## BSD Licensed

[0]: https://github.com/facebook/react/
[1]: https://github.com/STRML/JSXHint/
