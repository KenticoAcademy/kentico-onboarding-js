const memoize = require('memoizee');

const getArgumentsArray = (...keys) => keys;

// Set length to false means that memoize will work with any number of arguments.
// Set max to sth means that cache size is limited.
const memoizeKeys = memoize(getArgumentsArray, { length: false, max: 1 });

export const getKeys = list => memoizeKeys(...list.keySeq().toArray());
