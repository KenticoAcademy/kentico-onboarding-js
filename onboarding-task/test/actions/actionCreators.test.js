import {
  editItem,
  toggleItemViewMode,
  deleteItem,
  positivelyCreateItemLocally,
} from '../../src/actions/actionCreators';
import {
  POSITIVELY_CREATE_ITEM_LOCALLY,
  DELETE_ITEM,
  EDIT_ITEM,
  TOGGLE_ITEM_VIEW_MODE,
  ITEMS_FETCHING_FAILED,
  ITEM_SAVE_FAILED,
} from '../../src/actions/actionTypes';
import { receiveItemsFetchingErrorFactory } from '../../src/actions/receiveItemsFetchingErrorFactory';
import { receivePostItemErrorFactory } from '../../src/actions/receivePostItemErrorFactory';
import { Item } from '../../src/models/Item.ts';
import { ErrorMessage } from '../../src/models/ErrorMessage';

describe('actionCreators', () => {
  const id = 'da5cbf5f-2d20-4945-b8d2-4cc3b6be1542';
  const ueid = '2235d270-3918-48d9-95f7-a1b0ef008126';
  const value = 'value';
  const item = new Item({
    id,
    ueid,
    value
  });

  it('deleteItem creates correct action', () => {
    const expectedAction = {
      type: DELETE_ITEM,
      payload: { id },
    };

    const actualAction = deleteItem(id);

    expect(actualAction).toEqual(expectedAction);
  });

  it('positivelyCreateItemLocally creates correct action', () => {
    const expectedAction = {
      type: POSITIVELY_CREATE_ITEM_LOCALLY,
      payload: { ueid, value },
    };

    const actualAction = positivelyCreateItemLocally(item);

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

  it('receiveItemsFetchingErrorFactory creates correct action', () => {
      const generateId = () => id;
      const error = new ErrorMessage({ message: 'message' });

      const receiveItemsFetchingError = receiveItemsFetchingErrorFactory(generateId)(error);

      expect(receiveItemsFetchingError.type).toEqual(ITEMS_FETCHING_FAILED);
      expect(receiveItemsFetchingError.payload).toEqual({
        id: id,
        message: 'message',
      });
    }
  );

  it('receivePostItemFetchingErrorFactory creates correct action', () => {
      const generateId = () => id;
      const error = new Error('message');

      const receiveItemsFetchingError = receivePostItemErrorFactory(generateId)(error, ueid);

      expect(receiveItemsFetchingError.type).toEqual(ITEM_SAVE_FAILED);
      expect(receiveItemsFetchingError.payload).toEqual({
        id,
        itemUeid: ueid,
        message: 'message',
      });
    }
  );
});
