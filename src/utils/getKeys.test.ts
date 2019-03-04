import { getKeys } from './getKeys';
import { IListItem } from '../models/ListItem';

const createListItem = (id: Uuid, text: string): IListItem  => {
  return {
    id,
    text,
    isActive: false,
    creationTime: '',
    lastUpdateTime: '',
  };
};

describe('getKeys', () => {
  it('returns same reference for 2 consecutive calls with the same argument', () => {
    const list: ReadonlyArray<IListItem> = [
      createListItem('123', 'aa'),
      createListItem('-489', 'bb'),
      createListItem('854', 'cc')
    ];
    const expectedIds = ['123', '-489', '854'];

    const actualIds = getKeys(list);
    const actualIds1 = getKeys(list);

    expect(actualIds).toEqual(expectedIds);
    expect(actualIds).toBe(actualIds1);
  });

  it('only memoizes consecutive calls and does not fail when the number of arguments changes between calls', () => {
    const list1: ReadonlyArray<IListItem> = [
      createListItem('123', 'aa'),
      createListItem('-489', 'bb'),
      createListItem('854', 'cc')
    ];
    const list2: ReadonlyArray<IListItem> = [
      createListItem('123', 'aa'),
      createListItem('0', 'bb')
    ];
    const expectedIds1 = ['123', '-489', '854'];
    const expectedIds2 = ['123', '0'];

    const actualIds1 = getKeys(list1);
    const actualIds2 = getKeys(list2);
    const actualIds3 = getKeys(list1);

    expect(actualIds2).toEqual(expectedIds2);
    expect(actualIds1).toEqual(expectedIds1);
    expect(actualIds3).toEqual(actualIds1);
    expect(actualIds1).not.toBe(actualIds3);
  });
});
