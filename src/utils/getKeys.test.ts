import { getKeys } from './getKeys';
import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';

describe('getKeys', () => {
  it('returns same reference for 2 consecutive calls with the same argument', () => {
    const list = OrderedMap<Uuid, ListItem>([
      ['123', undefined],
      ['-489', undefined],
      ['854', undefined]
    ]);
    const expectedIds = ['854', '-489', '123'];

    const actualIds = getKeys(list);
    const actualIds1 = getKeys(list);

    expect(actualIds).toEqual(expectedIds);
    expect(actualIds).toBe(actualIds1);
  });

  it('only memoizes consecutive calls and does not fail when the number of arguments changes between calls', () => {
    const list1 = OrderedMap<Uuid, ListItem>([
      ['123', undefined],
      ['-489', undefined],
      ['854', undefined]
    ]);
    const list2 = OrderedMap<Uuid, ListItem>([
      ['123', undefined],
      ['0', undefined]
    ]);
    const expectedIds1 = ['854', '-489', '123'];
    const expectedIds2 = ['0', '123'];

    const actualIds1 = getKeys(list1);
    const actualIds2 = getKeys(list2);
    const actualIds3 = getKeys(list1);

    expect(actualIds2).toEqual(expectedIds2);
    expect(actualIds1).toEqual(expectedIds1);
    expect(actualIds3).toEqual(actualIds1);
    expect(actualIds1).not.toBe(actualIds3);
  });
});

