import { OrderedMap } from 'immutable';

import { items as listReducer } from './items';
import { ListItem } from '../../models/ListItem';

import { addItemCreator } from '../../actions/addItemCreator';

import { saveItemCreator } from '../../actions/saveItemCreator';

import {
  deleteItem,
  toggleItem
} from '../../actions/ListActions';
import { IAction } from '../../actions/IAction';

const createItem = (id: Uuid, text: string, isActive: boolean = false, creationTime: string = '0005-12-17 20:30:00', lastUpdateTime: string = creationTime) =>
  [
    id,
    new ListItem({
      id,
      text,
      isActive,
      creationTime,
      lastUpdateTime
    })
  ];

describe('ListReducer', () => {
  it('returns default state', () => {
    const expectedList = OrderedMap<Uuid, ListItem>();
    const action: IAction = {type: '', payload: undefined};

    const actualList = listReducer(undefined, action);

    expect(actualList).toBe(expectedList);
  });

  it('returns prevState after undefined action', () => {
    const expectedList = OrderedMap<Uuid, ListItem>([
      createItem('3970a0db-c877-49e1-b4d0-75e931384289', 'text', true)
    ]);

    const actualList = listReducer(expectedList, {type: 'undefinedAction', payload: undefined});

    expect(actualList).toBe(expectedList);
  });

  it('adds new item', () => {
    const id = '669a4b7c-264c-4196-8051-7f0570ce026a';
    const text = 'newItemText';
    const time = '2018-12-17 20:30:05';
    const expectedList = OrderedMap<Uuid, ListItem>([
      createItem(id, text, false, time)
    ]);
    const addItem = addItemCreator(() => id, () => time);

    const action = addItem(text);
    const actualList = listReducer(undefined, action);

    expect(actualList).toEqual(expectedList);
  });

  it('edits item', () => {
    const item1 = createItem('b0e9856e-bb17-4c0b-b65f-f5a43e81617c', 'tem1text');
    const id2 = 'c264d24b-53da-428b-8ffc-e05ad161d3fb';
    const creationTime = '1658-05-06 08:30:25';
    const lastUpdateTime = '3000-07-10 05:48:35';

    const defaultList = OrderedMap<Uuid, ListItem>([
      item1,
      createItem(id2, 'oldText', true, creationTime),
    ]);

    const newText = 'newText';

    const expectedList = OrderedMap<Uuid, ListItem>([
      item1,
      createItem(id2, newText, false, creationTime, lastUpdateTime),
    ]);

    const saveItem = saveItemCreator(() => lastUpdateTime);

    const action = saveItem(id2, newText);
    const actualList = listReducer(defaultList, action);

    expect(actualList).toEqual(expectedList);
    expect(actualList).not.toBe(defaultList);
  });

  it('toggles item', () => {
    const id = 'b0e9856e-bb17-4c0b-b65f-f5a43e81617c';
    const text = 'text';

    const defaultList = OrderedMap<Uuid, ListItem>([
      createItem(id, text, true),
    ]);

    const expectedList = OrderedMap<Uuid, ListItem>([
      createItem(id, text)
    ]);

    const action1 = toggleItem(id);
    const actualList1 = listReducer(defaultList, action1);

    const action2 = toggleItem(id);
    const actualList2 = listReducer(actualList1, action2);

    expect(actualList1).toEqual(expectedList);
    expect(actualList1).not.toBe(defaultList);

    expect(actualList2).toEqual(defaultList);
    expect(actualList2).not.toBe(actualList1);
  });

  it('deletes item from state', () => {
    const item1 = createItem('b0e9856e-bb17-4c0b-b65f-f5a43e81617c', 'item1Text');
    const id2 = 'c264d24b-53da-428b-8ffc-e05ad161d3fb';
    const item3 = createItem('76879f15-2c73-4fed-99b2-5736da670f79', 'item3Text');

    const defaultList = OrderedMap<Uuid, ListItem>([
      item1,
      createItem(id2, 'item2Text', true),
      item3
    ]);

    const expectedList = OrderedMap<Uuid, ListItem>([
      item1,
      item3
    ]);

    const action = deleteItem(id2);
    const actualList = listReducer(defaultList, action);

    expect(actualList).toEqual(expectedList);
    expect(actualList).not.toBe(defaultList);
  });

  it('returns such item in its state after an accepted action that it can be mutated by a second action accepted by the reducer', () => {
    const id = 'b0e9856e-bb17-4c0b-b65f-f5a43e81617c';
    const text = 'oldText';
    const creationTime = '1658-05-06 08:30:25';
    const lastUpdateTime = '3000-07-10 05:48:35';

    const defaultList = OrderedMap<Uuid, ListItem>([
      createItem(id, text, false, creationTime),
    ]);

    const expectedList1 = OrderedMap<Uuid, ListItem>([
      createItem(id, text, true, creationTime)
    ]);

    const newText = 'newText';

    const expectedList2 = OrderedMap<Uuid, ListItem>([
      createItem(id, newText, false, creationTime, lastUpdateTime)
    ]);

    const action1 = toggleItem(id);
    const actualList1 = listReducer(defaultList, action1);

    const saveItem = saveItemCreator(() => lastUpdateTime);

    const action2 = saveItem(id, newText);
    const actualList2 = listReducer(actualList1, action2);

    expect(actualList1).toEqual(expectedList1);
    expect(actualList1).not.toBe(expectedList1);

    expect(actualList2).toEqual(expectedList2);
    expect(actualList2).not.toBe(expectedList2);
  });
});
