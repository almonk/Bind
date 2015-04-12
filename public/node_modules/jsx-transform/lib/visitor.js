var Syntax = require('jstransform/node_modules/esprima-fb').Syntax;
var utils = require('jstransform/src/utils');


/**
 * Visit tag node and desugar JSX.
 *
 * @see {@link https://github.com/facebook/jstransform}
 * @param {Function} traverse
 * @param {Object} object
 * @param {String} path
 * @param {Object} state
 * @returns {Boolean}
 * @private
 */
function visitNode(traverse, object, path, state) {
	var options = state.g.opts;
	var ident = (options.jsx || utils.getDocblock(state).jsx);
	var openingEl = object.openingElement;
	var closingEl = object.closingElement;
	var nameObj = openingEl.name;
	var attributes = openingEl.attributes;

	if (options.ignoreDocblock && !options.jsx) {
		throw new Error("options.jsx must be specified if ignoring docblocks");
	}

	if (!options.renameAttrs) {
		options.renameAttrs = {};
	}

	utils.catchup(openingEl.range[0], state, trimLeft);

	var tagName = nameObj.name;
  var isXJSIdentifier = nameObj.type === Syntax.XJSIdentifier;
	var knownTag = tagName[0] !== tagName[0].toUpperCase() && isXJSIdentifier;

	if (knownTag) {
		if (options.tagMethods) {
			utils.append(ident + '.', state); // DOM.div(...)
		} else {
			utils.append(ident + "('", state); // DOM('div', ...)
		}
	} else if (options.docblockUnknownTags) {
		utils.append(ident + '(', state);
	}

	utils.move(nameObj.range[0], state);
	utils.catchup(nameObj.range[1], state);

	if (knownTag) {
		if (options.tagMethods) {
			// DOM.div(...)
			utils.append('(', state);
		} else {
			// DOM('div', ...)
			utils.append("', ", state);
		}
	} else if (options.docblockUnknownTags) {
		// DOM(Component, ...)
		utils.append(', ', state);
	} else {
		// Component(...)
		utils.append('(', state);
	}

	if (attributes.length) {
		utils.append('{', state);
	} else {
		utils.append('null', state);
	}

	attributes.forEach(function(attr, index) {
		var isLast = (index === (attributes.length - 1));
		var name = attr.name.name;

		utils.catchup(attr.range[0], state, trimLeft);

		var displayName = name;
		if (name in options.renameAttrs) {
			displayName = options.renameAttrs[name];
		}

		utils.append(quoteJSObjKey(displayName) + ': ', state);

		if (attr.value) {
			utils.move(attr.name.range[1], state);
			utils.catchupNewlines(attr.value.range[0], state);
			if (attr.value.type === Syntax.Literal) {
				renderXJSLiteral(attr.value, isLast, state);
			} else {
				renderXJSExpressionContainer(traverse, attr.value, isLast, path, state);
			}
		} else {
			state.g.buffer += 'true';
			state.g.position = attr.name.range[1];
			if (!isLast) {
				utils.append(', ', state);
			}
		}

		utils.catchup(attr.range[1], state, trimLeft);
	});

	if (!openingEl.selfClosing) {
		utils.catchup(openingEl.range[1] - 1, state, trimLeft);
		utils.move(openingEl.range[1], state);
	}

	if (attributes.length) {
		utils.append('}', state);
	}

	var children = object.children.filter(function(child) {
		return !(child.type === Syntax.Literal
		&& typeof child.value === 'string'
		&& child.value.match(/^[ \t]*[\r\n][ \t\r\n]*$/));
	});

	if (children.length) {
		var lastRenderableIndex;

		children.forEach(function(child, index) {
			if (child.type !== Syntax.XJSExpressionContainer ||
				child.expression.type !== Syntax.XJSEmptyExpression) {
				lastRenderableIndex = index;
			}
		});

		if (lastRenderableIndex !== undefined) {
			utils.append(', ', state);
		}

		if (children.length) {
			utils.append('[', state);
		}

		children.forEach(function(child, index) {
			utils.catchup(child.range[0], state, trimLeft);

			var isFirst = index === 0;
			var isLast = index >= lastRenderableIndex;

			if (child.type === Syntax.Literal) {
				renderXJSLiteral(child, isLast, state);
			} else if (child.type === Syntax.XJSExpressionContainer) {
				renderXJSExpressionContainer(traverse, child, isLast, path, state);
			} else {
				traverse(child, path, state);
				if (!isLast) {
					utils.append(',', state);
				}
			}

			utils.catchup(child.range[1], state, trimLeft);
		});
	}

	if (openingEl.selfClosing) {
		// everything up to />
		utils.catchup(openingEl.range[1] - 2, state, trimLeft);
		utils.move(openingEl.range[1], state);
	} else {
		// everything up to </close>
		utils.catchup(closingEl.range[0], state, trimLeft);
		utils.move(closingEl.range[1], state);
	}

	if (children.length) {
		utils.append(']', state);
	}

	utils.append(')', state);

	return false;
}

/**
 * Returns true if node is JSX tag.
 *
 * @param {Object} object
 * @param {String} path
 * @param {Object} state
 * @returns {Boolean}
 * @private
 */
visitNode.test = function(object, path, state) {
	var jsx = utils.getDocblock(state).jsx || state.g.opts.ignoreDocblock;
	return object.type === Syntax.XJSElement && jsx;
};

/**
 * Taken from {@link https://github.com/facebook/react/blob/0.10-stable/vendor/fbtransform/transforms/xjs.js}
 *
 * @param {Object} object
 * @param {Boolean} isLast
 * @param {Object} state
 * @param {Number} start
 * @param {Number} end
 * @private
 */
function renderXJSLiteral(object, isLast, state, start, end) {
	var lines = object.value.split(/\r\n|\n|\r/);

	if (start) {
		utils.append(start, state);
	}

	var lastNonEmptyLine = 0;

	lines.forEach(function (line, index) {
		if (line.match(/[^ \t]/)) {
			lastNonEmptyLine = index;
		}
	});

	lines.forEach(function (line, index) {
		var isFirstLine = index === 0;
		var isLastLine = index === lines.length - 1;
		var isLastNonEmptyLine = index === lastNonEmptyLine;

		// replace rendered whitespace tabs with spaces
		var trimmedLine = line.replace(/\t/g, ' ');

		// trim whitespace touching a newline
		if (!isFirstLine) {
			trimmedLine = trimmedLine.replace(/^[ ]+/, '');
		}
		if (!isLastLine) {
			trimmedLine = trimmedLine.replace(/[ ]+$/, '');
		}

		if (!isFirstLine) {
			utils.append(line.match(/^[ \t]*/)[0], state);
		}

		if (trimmedLine || isLastNonEmptyLine) {
			utils.append(
				JSON.stringify(trimmedLine) +
				(!isLastNonEmptyLine ? " + ' ' +" : ''),
				state);

			if (isLastNonEmptyLine) {
				if (end) {
					utils.append(end, state);
				}
				if (!isLast) {
					utils.append(', ', state);
				}
			}

			// only restore tail whitespace if line had literals
			if (trimmedLine && !isLastLine) {
				utils.append(line.match(/[ \t]*$/)[0], state);
			}
		}

		if (!isLastLine) {
			utils.append('\n', state);
		}
	});

	utils.move(object.range[1], state);
}

/**
 * Taken from {@link https://github.com/facebook/react/blob/0.10-stable/vendor/fbtransform/transforms/xjs.js}
 *
 * @param {Function} traverse
 * @param {Object} object
 * @param {Boolean} isLast
 * @param {String} path
 * @param {Object} state
 * @returns {Boolean}
 * @private
 */
function renderXJSExpressionContainer(traverse, object, isLast, path, state) {
	// Plus 1 to skip `{`.
	utils.move(object.range[0] + 1, state);
	traverse(object.expression, path, state);

	if (!isLast && object.expression.type !== Syntax.XJSEmptyExpression) {
		// If we need to append a comma, make sure to do so after the expression.
		utils.catchup(object.expression.range[1], state, trimLeft);
		utils.append(', ', state);
	}

	// Minus 1 to skip `}`.
	utils.catchup(object.range[1] - 1, state, trimLeft);
	utils.move(object.range[1], state);
	return false;
}

/**
 * Quote invalid object literal keys.
 *
 * @param {String} name
 * @returns {String}
 * @private
 */
function quoteJSObjKey(name) {
	if (!/^[a-z_$][a-z\d_$]*$/i.test(name)) {
		return "'" + name + "'";
	}
	return name;
}

/**
 * Trim whitespace left of `val`.
 *
 * @param {String} val
 * @returns {String}
 * @private
 */
function trimLeft(val) {
	return val.replace(/^ +/, '');
}

module.exports = visitNode;
