/**
 * Game logic is here
 * @module Game
 * @see module:components/GameComponent
 */

import fp from 'lodash/fp';

// string -> string -> string
const shuffleP = (shd, rem) => {
  const r = Math.floor(Math.random() * rem.length);
  const arr = rem.split('');
  const nrem = arr.slice(0, r).join('') + arr.slice(r + 1).join('');
  return (rem.length === 0)
    ? shd
    : shuffleP(shd + rem.charAt(r), nrem);
};

/**
 * Shuffle a given string
 * @method
 * @param {string} str
 * @returns {string}
 */
export const shuffle = str => shuffleP('', str);

/**
 * @typedef {Object} Key
 * @property {number} id ID to identify a key
 * @property {string} ch Character displayed on key
 * @property {boolean} used Is a key already used?
 */

/**
 * Generate keys array from string
 * @method
 * @param {string} str Input string to convert
 * @returns {Key[]} An array of keys
 */
export const toKeys =
  str => str.split('').map((e, i) => ({ id: i, ch: e, used: false }));

/**
 * Mark a key as used / unused based on a typed character.
 * @method
 * @param {Key[]} keys Array of all keys
 * @param {string} ch Character to mark
 * @param {boolean} [use=true] Mark as used if true, otherwise false
 * @returns {Key[]} Updated array of all keys
 */
export const useKey = (keys, ch, use = true) => {
  const idx = keys.findIndex(el => el.ch === ch && el.used === !use);
  return (idx === -1)
    ? keys
    : keys.slice(0, idx)
          .concat([fp.set('used')(use)(keys[idx])])
          .concat(keys.slice(idx + 1));
};

/**
 * Decide whether there is any unused keys still remaining
 * @method
 * @param {Key[]} keys Array of all keys
 * @param {string} ch Character to check
 * @returns {boolean} True if there is an unused keys for the letter, false
 *                    otherwise
 */
export const isUnused =
  (keys, ch) => keys.findIndex(el => el.ch === ch && !el.used) !== -1;


/**
 * Update keys based on the already entered word and last pressed key
 * @param {Key[]} keys Array of all keys
 * @param {string} entered Text already entered
 * @param {string} pressedKey Pressed letter / key in lowercase (Event.key)
 * @returns {Object[]} Tuple of keys and updated entered string
 */
export const updateKeys = (keys, entered, pressedKey) => {
  const lastLetter = (entered.length > 0) ? fp.last(entered) : '';
  return (pressedKey.match(/^[a-zA-Z]$/) && isUnused(keys, pressedKey))
    ? [useKey(keys, pressedKey), entered + pressedKey]
    : (pressedKey === 'backspace')
    ? [useKey(keys, lastLetter, false), fp.initial(entered).join('')]
    : [keys, entered];
};
