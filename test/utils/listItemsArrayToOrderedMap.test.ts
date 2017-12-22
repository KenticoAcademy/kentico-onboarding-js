import { IListItem } from '../../src/models/IListItem';
import { ListItem } from '../../src/models/ListItem';
import { listItemsArrayToOrderedMap } from '../../src/utils/listItemsArrayToOrderedMap';
import { OrderedMap } from 'immutable';
import { Guid } from '../../src/models/Guid';

describe('listItemsArrayToOrderedMap', () => {
  it('will create OrderedMap from array of 2 ListItems', () => {
    const listItem1 = new ListItem({
      id: 'fakeId',
      text: 'whatever',
    });
    const listItem2 = new ListItem({
      id: 'fakeId2',
      text: 'something else',
    });
    const listItems: IListItem[] = [
      listItem1,
      listItem2,
    ];

    const expectedResult = OrderedMap<Guid, ListItem>({
      [listItem1.id]: listItem1,
      [listItem2.id]: listItem2,
    });

    const result = listItemsArrayToOrderedMap(listItems);

    expect(result)
      .toEqual(expectedResult);
  });
});
