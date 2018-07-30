import { getKeys } from './getKeys';
import { OrderedMap } from 'immutable';

describe('getKeys', () => {
  it('returns same reference for 2 consecutive calls with the same argument', () => {
    const list = OrderedMap([
      [123, '111'],
      [-489, 'sfdgd'],
      [854, 'dfg']
    ]);
    const expectedIds = [123, -489, 854];

    const actualIds = getKeys(list);
    const actualIds1 = getKeys(list);

    expect(actualIds).toEqual(expectedIds);
    expect(actualIds).toBe(actualIds1);
  });

  it('only memoizes consecutive calls and does not fail when the number of arguments changes between calls', () => {
    const list1 = OrderedMap([
      [123, '111'],
      [-489, 'sfdgd'],
      [854, 'dfg']
    ]);
    const list2 = OrderedMap([
      [123, 'fds'],
      [0, 'dsr']
    ]);
    const expectedIds1 = [123, -489, 854];
    const expectedIds2 = [123, 0];

    const actualIds1 = getKeys(list1);
    const actualIds2 = getKeys(list2);
    const actualIds3 = getKeys(list1);

    expect(actualIds2).toEqual(expectedIds2);
    expect(actualIds1).toEqual(expectedIds1);
    expect(actualIds3).toEqual(actualIds1);
    expect(actualIds1).not.toBe(actualIds3);
  });
});

