import { Map } from 'immutable';

import { items as listReducer } from './items';
import { ListItem, IListItem } from '../../../models/ListItem';

import { deletingSucceeded as deleteItemAction } from '../../../actions/fetchActions/requestDeleteItem';
import { addingSucceeded as addItemAction } from '../../../actions/fetchActions/requestAddItem';
import { editingSucceeded as saveItemAction } from '../../../actions/fetchActions/requestEditItem';

import {
  toggleItem
} from '../../../actions/ListActions';
import { IAction } from '../../../actions/IAction';
import { ItemProperties } from '../../../models/ItemProperties';

interface IListItemParams {
  id: Uuid;
  text: string;
  isActive?: boolean;
  creationTime: Time;
  lastUpdateTime?: Time;
}

const createListItem = ({ id, text, creationTime, ...params }: IListItemParams): IListItem => (
  {
    id,
    text,
    isActive: params.isActive || false,
    creationTime,
    lastUpdateTime: params.lastUpdateTime || creationTime,
    properties: new ItemProperties()
  });

const createItem = (id: Uuid, text: string, isActive: boolean = false, creationTime: string = '0005-12-17 20:30:00', lastUpdateTime: string = creationTime
): [string, ListItem] =>
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
    const expectedList = Map<Uuid, ListItem>();
    const action: IAction = { type: '', payload: undefined };

    const actualList = listReducer(undefined, action);

    expect(actualList).toBe(expectedList);
  });

  it('returns prevState after undefined action', () => {
    const expectedList = Map<Uuid, ListItem>([
      createItem('3970a0db-c877-49e1-b4d0-75e931384289', 'text', true)
    ]);

    const actualList = listReducer(expectedList, { type: 'undefinedAction', payload: undefined });

    expect(actualList).toBe(expectedList);
  });

  it('adds new item', () => {
    const id = '669a4b7c-264c-4196-8051-7f0570ce026a';
    const text = 'newItemText';
    const time = '2018-12-17 20:30:05';
    const expectedList = Map<Uuid, ListItem>([
      createItem(id, text, false, time)
    ]);
    const newItem = createListItem({ id, text, creationTime: time });
    const action = addItemAction(newItem);

    const actualList = listReducer(undefined, action);

    expect(actualList).toEqual(expectedList);
  });

  it('edits item', () => {
    const item1 = createItem('b0e9856e-bb17-4c0b-b65f-f5a43e81617c', 'tem1text');
    const id = 'c264d24b-53da-428b-8ffc-e05ad161d3fb';
    const creationTime = '1658-05-06 08:30:25';
    const lastUpdateTime = '3000-07-10 05:48:35';

    const defaultList = Map<Uuid, ListItem>([
      item1,
      createItem(id, 'oldText', true, creationTime),
    ]);

    const newText = 'newText';

    const expectedList = Map<Uuid, ListItem>([
      item1,
      createItem(id, newText, false, creationTime, lastUpdateTime),
    ]);

    const editedItem = createListItem({ id, text: newText, creationTime, lastUpdateTime });
    const action = saveItemAction(editedItem);
    const actualList = listReducer(defaultList, action);

    expect(actualList).toEqual(expectedList);
    expect(actualList).not.toBe(defaultList);
  });

  it('toggles item', () => {
    const id = 'b0e9856e-bb17-4c0b-b65f-f5a43e81617c';
    const text = 'text';

    const defaultList = Map<Uuid, ListItem>([
      createItem(id, text, true),
    ]);

    const expectedList = Map<Uuid, ListItem>([
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

    const defaultList = Map<Uuid, ListItem>([
      item1,
      createItem(id2, 'item2Text', true),
      item3
    ]);

    const expectedList = Map<Uuid, ListItem>([
      item1,
      item3
    ]);

    const action = deleteItemAction(id2);
    const actualList = listReducer(defaultList, action);

    expect(actualList).toEqual(expectedList);
    expect(actualList).not.toBe(defaultList);
  });

  it('returns such item in its state after an accepted action that it can be mutated by a second action accepted by the reducer', () => {
    const id = 'b0e9856e-bb17-4c0b-b65f-f5a43e81617c';
    const text = 'oldText';
    const creationTime = '1658-05-06 08:30:25';
    const lastUpdateTime = '3000-07-10 05:48:35';

    const defaultList = Map<Uuid, ListItem>([
      createItem(id, text, false, creationTime),
    ]);

    const expectedList1 = Map<Uuid, ListItem>([
      createItem(id, text, true, creationTime)
    ]);

    const newText = 'newText';

    const expectedList2 = Map<Uuid, ListItem>([
      createItem(id, newText, false, creationTime, lastUpdateTime)
    ]);

    const action1 = toggleItem(id);
    const actualList1 = listReducer(defaultList, action1);

    const editedItem = createListItem({ id, text: newText, creationTime, lastUpdateTime });
    const action2 = saveItemAction(editedItem);
    const actualList2 = listReducer(actualList1, action2);

    expect(actualList1).toEqual(expectedList1);
    expect(actualList1).not.toBe(expectedList1);

    expect(actualList2).toEqual(expectedList2);
    expect(actualList2).not.toBe(expectedList2);
  });
});
