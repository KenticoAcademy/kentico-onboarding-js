import { OrderedMap } from 'immutable';
import { ListError } from '../../models/ListError';
import { errors } from './errors';
import { IListAction } from '../../actions/types/IListAction';
import {
  addItem,
  addItemFail,
  addItemSuccess,
  closeAddError,
  closeDeleteError,
  initItemDelete,
  deleteItemFail,
  deleteItemSuccess,
  saveItem,
  saveItemSuccess, saveItemFail, closeSaveError,
} from '../../actions/listActionCreators';

const itemId = '00000000-0000-0000-0000-0000001';
const errorId = '00000000-0000-0000-0000-0000002';

describe('Fail actions', () => {
  const error = new ListError({itemId, errorId});
  const failedActions: IListAction[] = [
    addItemFail(itemId, error),
    deleteItemFail(itemId, error),
    saveItemFail(itemId, error),
  ];

  failedActions.forEach(failedItem =>
    it('should add error to state', () => {
      const expectedResult = OrderedMap<Uuid, ListError>().set(error.errorId, error);

      const result = errors(undefined, failedItem);

      expect(result).toEqual(expectedResult);
    }));
});

describe('Requests, close error actions', () => {
  const error = new ListError({itemId, errorId});
  const initialState = OrderedMap<Uuid, ListError>().set(error.errorId, error);
  const requestOrCloseErrorActions: IListAction[] = [
    saveItem(itemId, 'save me', ''),
    initItemDelete(itemId),
    addItem(itemId, 'add me'),
    closeSaveError(itemId, 'backup text'),
    closeAddError(itemId),
    closeDeleteError(itemId),
  ];

  requestOrCloseErrorActions.forEach(action =>
    it('should remove error from state', () => {
      const result = errors(initialState, action);

      expect(result).toEqual(OrderedMap<Uuid, ListError>());
    }));
});

describe('Success actions, invalid actions', () => {
  const fetchedId = '00000000-0000-0000-0000-0000003';
  const error = new ListError({itemId, errorId});
  const initialState = OrderedMap<Uuid, ListError>().set(error.errorId, error);
  const successAndInvalidActions: IListAction[] = [
    saveItemSuccess(itemId),
    deleteItemSuccess(itemId),
    addItemSuccess(itemId, fetchedId),
    {
      type: 'INVALID_ACTION',
      payload: null,
    },
  ];

  successAndInvalidActions.forEach(action => {
    it('shouldn\'t modify state', () => {
      const result = errors(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
