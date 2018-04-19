import { IListItem } from '../../src/models/interfaces/IListItem';
import { ListItem } from '../../src/models/classes/ListItem';
import { OrderedMap } from 'immutable';
import { Uuid } from '../../src/models/Uuid';
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

    const expectedResult = OrderedMap<Uuid, ListItem>({
      [listItem1.id]: listItem1,
      [listItem2.id]: listItem2,
    });

    const result = arrayToOrderedMap(listItems, ListItem);

    expect(result)
      .toEqual(expectedResult);
  });

  it('will return the same OrderedMap from the same array of 2 ListItems', () => {
    const listItem1 = new ListItem({
      id: 'fakeId',
      text: 'whatever',
    });
    const listItem2 = new ListItem({
      id: 'fakeId2',
      text: 'something else',
    });
    const listItems: IListItem[] = [ listItem1, listItem2 ];

    const firstResult = arrayToOrderedMap(listItems, ListItem);
    const secondResult = arrayToOrderedMap(listItems, ListItem);

    expect(firstResult)
      .toEqual(secondResult);
  });
});
