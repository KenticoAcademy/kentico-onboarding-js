import {
  deleteItem, displayError, loadingItemsSuccess,
  saveItemText,
  toggleItemEditing,
} from './itemsActions';
import { generateUuid } from '../utils/generateUuid';
import { addItemCreator } from './creators/addItemCreator';
import {
  AddItemAction,
  DeleteItemAction, DisplayErrorAction, LoadingItemsSuccessAction,
  SaveItemTextAction,
  ToggleItemEditingAction,
} from './types/itemsActionTypes';
import { IItem, Item } from '../models/Item';

describe('addItem', () => {
  it('returns action with correct text', () => {
    const text: string = 'Learn react';
    const idGenerator = () => '1';
    const expectedResult: AddItemAction = {
      type: 'ADD_ITEM',
      payload: {
        text,
        id: idGenerator(),
      },
    };

    const result: AddItemAction = addItemCreator(idGenerator)(text);

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

describe('deleteItem', () => {
  it('returns action with correct id', () => {
    const id: Guid = generateUuid();
    const expectedResult: DeleteItemAction = {
      type: 'DELETE_ITEM',
      payload: {
        id,
      },
    };

    const result: DeleteItemAction = deleteItem(id);

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
      new Item({ id: '1', text: 'Text1' }),
      new Item({ id: '2', text: 'Text2' }),
      new Item({ id: '3', text: 'Text3' }),
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
