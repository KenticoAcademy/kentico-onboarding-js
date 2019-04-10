import { ListItem } from '../../models/ListItem';
import { item } from './item';
import { IListAction } from '../../actions/types/IListAction';
import { ListError } from '../../models/ListError';
import {
  addItem,
  addItemFail,
  addItemSuccess,
  changeItemEditingMode,
  closeDeleteError,
  closeSaveError,
  deleteItemFail,
  initItemDelete,
  saveItem,
  saveItemFail,
  saveItemSuccess,
} from '../../actions/listActionCreators';

const id = '00000000-0000-0000-0000-000000000001';

describe('Save item, delete item, add item requests', () => {
  const listItem: ListItem = new ListItem({
    id,
    text: 'I am list item.',
  });

  const saveDeleteAddActions = [
    initItemDelete(listItem.id),
    saveItem(listItem.id, 'new text', ''),
    addItem(listItem.id, listItem.text),
  ];

  saveDeleteAddActions.forEach(action =>
    it('should change item\'s isUpdating to true', () => {
      const originItemIsUpdating = listItem.isUpdating;

      const result = item(listItem, action);
      const changedItemIsUpdating = result.isUpdating;

      expect(originItemIsUpdating).toBeFalsy();
      expect(changedItemIsUpdating).toBeTruthy();
    }));
});

describe('Add item', () => {
  const states = [undefined, new ListItem()];

  states.forEach(initialState => {
    it('should return new item with same values as action\'s payload', () => {
      const listItem: ListItem = new ListItem({id, text: 'I am new item.'});
      const action: IListAction = addItem(listItem.id, listItem.text);
      const expectedResult = new ListItem({...action.payload});

      const result = item(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });

  it('should return new empty item when passing invalid action', () => {
    const newItem: IListAction = {
      type: 'INVALID',
      payload: {
        id: '1',
      },
    };
    const expectedResult = new ListItem();

    const result = item(undefined, newItem);

    expect(result).toEqual(expectedResult);
  });
});

describe('Add item success', () => {
    const listItem: ListItem = new ListItem({id, isUpdating: true});
    const fetchedId = '00000000-0000-0000-0000-000000000002';
    const newItem: IListAction = addItemSuccess(listItem.id, fetchedId);

    it('old item\'s isUpdating should be true, new item\'s should be false', () => {
      const originIsUpdating = listItem.isUpdating;

      const result = item(listItem, newItem);
      const newItemIsUpdating = result.isUpdating;

      expect(newItemIsUpdating).toBeFalsy();
      expect(originIsUpdating).toBeTruthy();
    });

    it(`new item\'s id should be ${fetchedId}`, () => {
      const result = item(listItem, newItem);
      const newItemId = result.id;

      expect(newItemId).toEqual(fetchedId);
    });
  },
);

describe('Add item fail, save item fail, delete item fail', () => {
  const errorId = '00000000-0000-0000-0000-000000000002';
  const listItem: ListItem = new ListItem({
    id,
    text: 'text',
    isUpdating: true,
  });

  const error: ListError = new ListError({errorId, itemId: id});

  const failActions = [
    addItemFail(listItem.id, error),
    deleteItemFail(listItem.id, error),
    saveItemFail(listItem.id, error),
  ];

  failActions.forEach(action =>
    it('should set isUpdating to false', () => {
      const originItemIsUpdating = listItem.isUpdating;

      const result = item(listItem, action);
      const changedItemIsUpdating = result.isUpdating;

      expect(originItemIsUpdating).toBeTruthy();
      expect(changedItemIsUpdating).toBeFalsy();
    }));
});

describe('Save item request', () => {
  const states = [undefined, new ListItem()];
  const action: IListAction = saveItem(id, 'saved', '');

  states.forEach(initialState => {
    it('should return new item with same values as action\'s payload with undefined state', () => {
      const expectedResult = new ListItem({...action.payload});

      const result = item(initialState, action);

      expect(result).toEqual(expectedResult);
    });
  });
});

describe('Save item success, close delete error', () => {
  const listItem: ListItem = new ListItem({
    id,
    isUpdating: true,
    text: 'text',
  });
  const itemSaveSuccess: IListAction = saveItemSuccess(listItem.id);
  const closeDelete: IListAction = closeDeleteError(listItem.id);
  const itemSaveCloseDelete = [itemSaveSuccess, closeDelete];

  itemSaveCloseDelete.forEach(action => {
    it('should change isUpdating to false', () => {
      const originItemIsUpdating = listItem.isUpdating;

      const result = item(listItem, action);
      const savedItemIsUpdating = result.isUpdating;

      expect(originItemIsUpdating).toBeTruthy();
      expect(savedItemIsUpdating).toBeFalsy();
    });
  });
});

describe('Close save item', () => {
  const backupText = 'Backup text';
  const listItem: ListItem = new ListItem({
    id,
    text: 'Save me',
  });
  const savedItem: IListAction = closeSaveError(listItem.id, backupText);

  it('should change text', () => {
    const originItemText = listItem.text;

    const result = item(listItem, savedItem);
    const savedItemText = result.text;

    expect(originItemText).toEqual(listItem.text);
    expect(savedItemText).toEqual(backupText);
  });
});

describe('Change item editing mode', () => {
  const itemWithFalseMode: ListItem = new ListItem({
    id,
    text: 'Click me.',
  });
  const clickedItem: IListAction = changeItemEditingMode(itemWithFalseMode.id);
  const itemWithTrueMode: ListItem = new ListItem({
    id: itemWithFalseMode.id,
    text: itemWithFalseMode.text,
    isEdited: true,
  });

  it('should change mode from false to true', () => {
    const result = item(itemWithFalseMode, clickedItem);

    expect(result).toEqual(itemWithTrueMode);
  });

  it('should change mode from true to false', () => {
    const result = item(itemWithTrueMode, clickedItem);

    expect(result).toEqual(itemWithFalseMode);
  });
});
