import { Map } from 'immutable';

import { getDefaultList } from './getDefaultList';
import { ListItem } from '../models/ListItem';

describe('getDefaultList', () => {
  it('returns instance of immutable ordered map', () => {
    const defaultList = getDefaultList();

    expect(defaultList).toBeInstanceOf(Map);
  });

  it('returns correctly created items in map', () => {
    const defaultList = getDefaultList();

    defaultList.forEach((item: ListItem, key: Uuid) => {
      expect(item.id).toEqual(key);
      expect(item.id).not.toEqual('');
      expect(item.text).not.toEqual('');
    });
  });
});

