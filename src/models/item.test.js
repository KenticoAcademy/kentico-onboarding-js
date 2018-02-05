import Immutable from 'immutable';
import { Item, defaultItem } from './Item.ts';

describe('Item', () => {
  it('creates immutable object', () => {
    const item = new Item(defaultItem);

    expect(item).toBeInstanceOf(Immutable.Record);
  });
});
