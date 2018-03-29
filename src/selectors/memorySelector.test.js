import { OrderedMap } from 'immutable';

import {
  getMemoizedValues,
  getMemoizedKeys,
} from './memorySelector.ts';

describe('OrderedMap is memoized correctly', () => {
  it('getMemoizedKeys returns one sequence for different OrderMap', () => {
    const map1 = new OrderedMap({ 1: 'xxx', 2: 'yyy' });
    const map2 = new OrderedMap({ 1: 'xxx', 2: 'yyy' });

    const keys1 = getMemoizedKeys(map1.keySeq());
    const keys2 = getMemoizedKeys(map2.keySeq());

    expect(keys1).toBe(keys2);
  });

  it('getMemoizedValues returns one sequence for different OrderMap', () => {
    const map1 = new OrderedMap({ 1: 'xxx', 2: 'yyy' });
    const map2 = new OrderedMap({ 1: 'xxx', 2: 'yyy' });

    const keys1 = getMemoizedValues(map1.valueSeq());
    const keys2 = getMemoizedValues(map2.valueSeq());

    expect(keys1).toBe(keys2);
  });
});
