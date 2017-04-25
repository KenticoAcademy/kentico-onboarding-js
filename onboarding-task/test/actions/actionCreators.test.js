import { editItem, toggleItemViewMode, deleteItem } from '../../src/actions/actionCreators';
import { CREATE_ITEM, DELETE_ITEM, EDIT_ITEM, TOGGLE_ITEM_VIEW_MODE } from '../../src/actions/actionTypes';
import { createItemFactory } from '../../src/actions/createItemFactory';

describe('actionCreators', () => {
  const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
  const ueid = '2235d270-3918-48d9-95f7-a1b0ef008126';
  const value = 'value';

  it('deleteItem creates correct action', () => {
    const expectedAction = {
      type: DELETE_ITEM,
      payload: { id },
    };

    const actualAction = deleteItem(id);

    expect(actualAction).toEqual(expectedAction);
  });

  it('createItem creates correct action', () => {
    const createItem = createItemFactory(() => ueid);
    const expectedAction = {
      type: CREATE_ITEM,
      payload: { ueid, value },
    };

    const actualAction = createItem(value);

    expect(actualAction).toEqual(expectedAction);
  });

  it('editItem creates correct action', () => {
    const expectedAction = {
      type: EDIT_ITEM,
      payload: { id, value },
    };

    const actualAction = editItem(id, value);

    expect(actualAction).toEqual(expectedAction);
  });

  it('toggleItemViewMode creates correct action', () => {
    const expectedAction = {
      type: TOGGLE_ITEM_VIEW_MODE,
      payload: { id },
    };

    const actualAction = toggleItemViewMode(id);

    expect(actualAction).toEqual(expectedAction);
  });
});
