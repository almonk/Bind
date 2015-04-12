/**
 * Trim all trailing spaces.
 *
 * @param {String} val
 * @returns {String}
 * @private
 */
function trimTrailingSpaces(val) {
  return val.replace(/[^\S\r\n]+$/gm, "");
}

module.exports = trimTrailingSpaces;
