import { IListItem } from '../../src/models/interfaces/IListItem';
import { ListItem } from '../../src/models/classes/ListItem';
import { OrderedMap } from 'immutable';
import { Guid } from '../../src/models/Guid';
import { arrayToOrderedMap } from '../../src/utils/arrayToOrderedMap';

describe('arrayToOrderedMap', () => {
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

    const result = arrayToOrderedMap(listItems, ListItem);

    expect(result)
      .toEqual(expectedResult);
  });
});
