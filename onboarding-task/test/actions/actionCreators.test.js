import { editItem, toggleItemViewMode, deleteItem } from '../../src/actions/actionCreators';
import { CREATE_ITEM, DELETE_ITEM, EDIT_ITEM, TOGGLE_ITEM_VIEW_MODE } from '../../src/actions/actionTypes';
import { createItemFactory } from '../../src/actions/createItemFactory';

describe('actionCreators', () => {
  it('deleteItem creates correct action', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const expectedAction = {
      type: DELETE_ITEM,
      payload: { id: id },
    };

    const actualAction = deleteItem(id);

    expect(actualAction).toEqual(expectedAction);
  });

  it('createItem creates correct action', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const createItem = createItemFactory(() => id);
    const value = 'value';
    const expectedAction = {
      type: CREATE_ITEM,
      payload: { id, value },
    };

    const actualAction = createItem(value);

    expect(actualAction).toEqual(expectedAction);
  });

  it('editItem creates correct action', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const value = 'value';
    const expectedAction = {
      type: EDIT_ITEM,
      payload: { id, value },
    };

    const actualAction = editItem(id, value);

    expect(actualAction).toEqual(expectedAction);
  });

  it('toggleItemViewMode creates correct action', () => {
    const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
    const expectedAction = {
      type: TOGGLE_ITEM_VIEW_MODE,
      payload: { id },
    };

    const actualAction = toggleItemViewMode(id);

    expect(actualAction).toEqual(expectedAction);
  });
});
