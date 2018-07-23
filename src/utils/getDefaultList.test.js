import { OrderedMap } from 'immutable';

import { getDefaultList } from './getDefaultList';

describe('getDefaultList', () => {
  it('returns instance of immutable ordered map', () => {
    const defaultList = getDefaultList();

    expect(defaultList).toBeInstanceOf(OrderedMap);
  });

  it('returns correctly created items in map', () => {
    const defaultList = getDefaultList();

    defaultList.forEach((item, key) => {
      expect(item.id).toEqual(key);
      expect(item.id).not.toEqual('');
      expect(item.text).not.toEqual('');
    });
  });
});

