import { sortItems } from './sortItems';
import { ListItem } from '../models/ListItem';
import { OrderedMap } from 'immutable';
import { ListSorting } from '../constants/ListSorting';

const createItem = (id: Uuid, creationTime: Time, lastUpdateTime: Time) => ([
  id,
  new ListItem({
    id,
    text: 'aaaa',
    isActive: false,
    creationTime,
    lastUpdateTime
  })
]);

describe('sortItems', () => {
  const item1 = createItem('1', '2018-12-17 15:05', '2018-12-17 15:08');
  const item2 = createItem('2', '2017-12-17 20:01', '3158-12-17 15:05');
  const item3 = createItem('3', '2015-12-17 03:49', '2017-12-17 15:05');
  const item4 = createItem('4', '2019-03-16 23:16', '1956-12-17 15:05');
  const item5 = createItem('5', '2018-12-15 15:30', '2014-12-17 15:05');
  const item6 = createItem('6', '2018-12-17 20:30', '2018-12-17 15:06');

  const items = OrderedMap<Uuid, ListItem>([item1, item2, item3, item4, item5, item6]);


  it('sorts correctly by creation time', () => {
    const expectedOrdering = [item4[1], item6[1], item1[1], item5[1], item2[1], item3[1]];

    const result = sortItems(items, ListSorting.CreatedTime);

    expect(result).toEqual(expectedOrdering);
  });

  it('sorts correctly by last update time', () => {
    const expectedOrdering = [item2[1], item1[1], item6[1], item3[1], item5[1], item4[1]];

    const result = sortItems(items, ListSorting.LastUpdateTime);

    expect(result).toEqual(expectedOrdering);
  });

});
