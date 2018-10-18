import memoize = require('fast-memoize');
import {Map} from 'immutable';


const memoizeErrors = memoize((errors: Map<string, string>) => errors);

export const selectErrorsMemoized = (errors: Map<string, string>): Map<string, string> => memoizeErrors(errors);
