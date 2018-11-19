import {
  addItem,
  addItemError,
  cancelItemUpdating,
  deleteItemError,
  deleteItemSuccess,
  displayError,
  loadingItemsSuccess,
  postItemSuccess,
  putItemSuccess,
  saveItemText,
  toggleItemEditing,
} from './itemsActions';
import { generateUuid } from '../utils/generateUuid';
import {
  AddItemAction,
  AddItemErrorAction,
  CancelItemUpdatingAction,
  DeleteItemErrorAction,
  DeleteItemSuccessAction,
  DisplayErrorAction,
  LoadingItemsSuccessAction,
  PostItemSuccessAction,
  PutItemSuccessAction,
  SaveItemTextAction,
  ToggleItemEditingAction,
} from './types/itemsActionTypes';
import { IItem, Item } from '../models/Item';
import { ErrorAction } from './types/ErrorAction';
import { ItemError } from '../models/Error';

describe('addItem', () => {
  it('returns action with correct text', () => {
    const text: string = 'Learn react';
    const itemId: Guid = '1';
    const expectedResult: AddItemAction = {
      type: 'ADD_ITEM',
      payload: {
        text,
        id: itemId,
      },
    };

    const result: AddItemAction = addItem(itemId, text);

    expect(result).toEqual(expectedResult);
  });
});

describe('saveItemText', () => {
  it('returns action with correct text and id', () => {
    const text: string = 'Learn redux';
    const id: Guid = generateUuid();
    const expectedResult: SaveItemTextAction = {
      type: 'SAVE_ITEM_TEXT',
      payload: {
        id,
        text,
      },
    };

    const result: SaveItemTextAction = saveItemText(id, text);

    expect(result).toEqual(expectedResult);
  });
});

describe('deleteItemSuccess', () => {
  it('returns action with correct id', () => {
    const id: Guid = generateUuid();
    const expectedResult: DeleteItemSuccessAction = {
      type: 'DELETE_ITEM_SUCCESS',
      payload: {
        id,
      },
    };

    const result: DeleteItemSuccessAction = deleteItemSuccess(id);

    expect(result).toEqual(expectedResult);
  });
});

describe('toggleItemEditing', () => {
  it('returns action with correct id', () => {
    const id: Guid = generateUuid();
    const expectedResult: ToggleItemEditingAction = {
      type: 'TOGGLE_ITEM_EDITING',
      payload: {
        id,
      },
    };

    const result: ToggleItemEditingAction = toggleItemEditing(id);

    expect(result).toEqual(expectedResult);
  });
});

describe('displayError', () => {
  it('returns action with error message', () => {
    const error: string = 'This is an error.';
    const expectedResult: DisplayErrorAction = {
      type: 'DISPLAY_ERROR',
      payload: {
        error,
      },
    };

    const result: DisplayErrorAction = displayError(error);

    expect(result).toEqual(expectedResult);
  });
});

describe('loadingItemsSuccess', () => {
  it('returns action with array of received items', () => {
    const response: IItem[] = [
      new Item({id: '1', text: 'Text1'}),
      new Item({id: '2', text: 'Text2'}),
      new Item({id: '3', text: 'Text3'}),
    ];
    const expectedResult: LoadingItemsSuccessAction = {
      type: 'LOADING_ITEMS_SUCCESS',
      payload: {
        response,
      },
    };

    const result: LoadingItemsSuccessAction = loadingItemsSuccess(response);

    expect(result).toEqual(expectedResult);
  });
});

describe('postItemSuccess', () => {
  it('returns action with correct ids', () => {
    const oldId: Guid = generateUuid();
    const newId: Guid = generateUuid();
    const expectedResult: PostItemSuccessAction = {
      type: 'POST_ITEM_SUCCESS',
      payload: {
        oldId,
        newId,
      },
    };

    const result: PostItemSuccessAction = postItemSuccess(oldId, newId);

    expect(result).toEqual(expectedResult);
  });
});

describe('addItemError', () => {
  it('returns action with correct error text', () => {
    const error: string = 'Learn react';
    const itemId: Guid = generateUuid();
    const action: ErrorAction = ErrorAction.Add;
    const errorId: Guid = '1';
    const itemError = new ItemError({
      id: errorId,
      message: error,
      action
    });
    const expectedResult: AddItemErrorAction = {
      type: 'ADD_ITEM_ERROR',
      payload: {
        itemId,
        error: itemError,
      },
    };

    const result: AddItemErrorAction = addItemError(itemId, itemError);

    expect(result).toEqual(expectedResult);
  });
});

describe('deleteItemError', () => {
  it('returns action with correct id', () => {
    const errorId: Guid = generateUuid();
    const expectedResult: DeleteItemErrorAction = {
      type: 'DELETE_ITEM_ERROR',
      payload: {
        errorId,
      },
    };

    const result: DeleteItemErrorAction = deleteItemError(errorId);

    expect(result).toEqual(expectedResult);
  });
});

describe('putItemSuccess', () => {
  it('returns action with correct ids', () => {
    const id: Guid = generateUuid();
    const expectedResult: PutItemSuccessAction = {
      type: 'PUT_ITEM_SUCCESS',
      payload: {
        id,
      },
    };

    const result: PutItemSuccessAction = putItemSuccess(id);

    expect(result).toEqual(expectedResult);
  });
});

describe('cancelItemUpdating', () => {
  it('returns action with correct text', () => {
    const id: Guid = generateUuid();
    const oldText = 'Old text';
    const expectedResult: CancelItemUpdatingAction = {
      type: 'CANCEL_ITEM_UPDATING',
      payload: {
        id,
        oldText,
      },
    };

    const result: CancelItemUpdatingAction = cancelItemUpdating(id, oldText);

    expect(result).toEqual(expectedResult);
  });
});
