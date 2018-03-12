import { OrderedMap } from 'immutable';

import { selectKeys } from './memoryKeysSelector';

describe('OrderedMap is memorized correctly', () => {
  it('returns one sequence for different OrderMap', () => {
    const map1 = new OrderedMap({ 1: 'xxx', 2: 'yyy' });
    const map2 = new OrderedMap({ 1: 'xxx', 2: 'yyy' });

    const keys1 = selectKeys(map1);
    const keys2 = selectKeys(map2);

    expect(keys1).toBe(keys2);
  });
});
