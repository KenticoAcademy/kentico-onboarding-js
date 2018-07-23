import { OrderedMap } from 'immutable';

import { list as listReducer } from './ListReducer';
import { ListItem } from '../models/ListItem';

import { addItemCreator } from '../actions/addItemCreator';

import {
  editItem,
  deleteItem
} from '../actions/ListActions';

const createItem = (id, text) =>
  [
    id,
    new ListItem({
      id,
      text
    })
  ];

describe('ListReducer', () => {
  it('returns default state', () => {
    const expectedList = OrderedMap();

    const actualList = listReducer(undefined, { type: '' });

    expect(actualList).toBe(expectedList);
  });

  it('returns prevState after undefined action', () => {
    const expectedList = OrderedMap([
      createItem('3970a0db-c877-49e1-b4d0-75e931384289', 'jdflsjk')
    ]);

    const actualList = listReducer(expectedList, { type: 'roisfhdln' });

    expect(actualList).toBe(expectedList);
  });

  it('adds new item', () => {
    const id = '669a4b7c-264c-4196-8051-7f0570ce026a';
    const text = 'aaaaa';
    const expectedList = OrderedMap([
      createItem(id, text)
    ]);

    const action = addItemCreator(() => id)(text);
    const actualList = listReducer(undefined, action);

    expect(actualList).toEqual(expectedList);
  });

  it('edits item', () => {
    const item1 = createItem('b0e9856e-bb17-4c0b-b65f-f5a43e81617c', 'aaaaa');
    const id2 = 'c264d24b-53da-428b-8ffc-e05ad161d3fb';

    const defaultList = OrderedMap([
      item1,
      createItem(id2, 'agfafdg'),
    ]);

    const newText = 'pooies';

    const expectedList = OrderedMap([
      item1,
      createItem(id2, newText),
    ]);

    const action = editItem(id2, newText);
    const actualList = listReducer(defaultList, action);

    expect(actualList).toEqual(expectedList);
    expect(actualList).not.toBe(defaultList);
  });

  it('deletes item from state', () => {
    const item1 = createItem('b0e9856e-bb17-4c0b-b65f-f5a43e81617c', 'aaaaa');
    const id2 = 'c264d24b-53da-428b-8ffc-e05ad161d3fb';
    const item3 = createItem('76879f15-2c73-4fed-99b2-5736da670f79', 'dfsxyxyc');

    const defaultList = OrderedMap([
      item1,
      createItem(id2, 'dfsxyxyc'),
      item3
    ]);

    const expectedList = OrderedMap([
      item1,
      item3
    ]);

    const action = deleteItem(id2);
    const actualList = listReducer(defaultList, action);

    expect(actualList).toEqual(expectedList);
    expect(actualList).not.toBe(defaultList);
  });
});
