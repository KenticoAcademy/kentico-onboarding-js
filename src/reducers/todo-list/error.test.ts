import { error } from './error';
import { OrderedMap } from 'immutable';
import { Uuid } from '../../utils/generateId';
import { Error } from '../../models/Error';
import { ListItem } from '../../models/ListItem';

describe('error reducer', () => {
  const ITEM_INSERT_ERROR_CLOSE = 'ITEM_INSERT_ERROR_CLOSE';
  const closeInsertError = {
    type: ITEM_INSERT_ERROR_CLOSE,
    payload: {
      id: 'b84faa03-b1b0-4ef0-9afa-f6ef805af48d'
    }
  };
  const id1: Uuid = 'b84faa03-b1b0-4ef0-ABAB-f6ef805af432';
  const id2: Uuid = 'b84faa03-b1b0-4ef0-ADAC-f6ef805af400';
  const insertErrorMessage = 'insert failed';
  const updateErrorMessage = 'update failed';
  const deleteErrorMessage = 'delete failed';

  it('should return empty ordered map for undefined state', () => {
    const initialState = error(undefined, closeInsertError);

    expect(initialState).toEqual(OrderedMap<Uuid, Error>());
  });

  it('should return previous state on unknown action', () => {
    const unknownAction = {
      type: 'BLA',
      payload: {
        errorId: 'b84faa03-b1b0-4ef0-9afa-f6ef805af48d'
      }
    };
    const previousState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id1,
        new Error({id: id1, errorMessage: updateErrorMessage})
      ]
    ]);

    const newState = error(previousState, unknownAction).toJS();

    expect(newState).toEqual(previousState.toJS());
  });

  it('should return previous state with new error on ITEM_INSERT_FAILED', () => {
    const item = {
        id: id2,
        errorId: null,
        isEdited: false,
        isSynchronized: true,
        text: ''
      };
    const insertFailed = {
      type: 'ITEM_INSERT_FAILED',
      payload: {
        item,
        message: insertErrorMessage
      }
    };
    const previousState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id1,
        new Error({
          id: id1,
          errorMessage: updateErrorMessage,
        })
      ]
    ]);
    const expectedState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id1,
        new Error({id: id1, errorMessage: 'update failed'})
      ],
      [
        id2,
        new Error({
          id: id2,
          errorMessage: insertErrorMessage,
          action: 'ITEM_INSERT_FAILED',
          item
        })
      ]
    ]).toJS();

    const newState = error(previousState, insertFailed).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should return previous state with new error on ITEM_UPDATE_FAILED', () => {
    const actionType = 'ITEM_UPDATE_FAILED';
    const item = new ListItem({id: id2, text: 'bla'});
    const updateFailed = {
      type: actionType,
      payload: {
        errorId: id2,
        message: updateErrorMessage,
        item
      }
    };
    const previousState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id1,
        new Error({id: id1, errorMessage: insertErrorMessage})
      ]
    ]);
    const expectedState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id1,
        new Error({id: id1, errorMessage: insertErrorMessage})
      ],
      [
        id2,
        new Error({
          id: id2,
          errorMessage: updateErrorMessage,
          action: actionType,
          item
        })
      ]
    ]).toJS();

    const newState = error(previousState, updateFailed).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should return previous state with new error on ITEM_DELETE_FAILED', () => {
    const item = {
      id: id2,
      errorId: null,
      isEdited: false,
      isSynchronized: true,
      text: ''
    };
    const deleteFailed = {
      type: 'ITEM_DELETION_FAILED',
      payload: {
        item,
        message: 'delete failed'
      }
    };
    const previousState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id1,
        new Error({id: id1, errorMessage: updateErrorMessage})
      ]
    ]);
    const expectedState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id1,
        new Error({id: id1, errorMessage: updateErrorMessage})
      ],
      [
        id2,
        new Error({
          id: id2,
          errorMessage: deleteErrorMessage,
          action: 'ITEM_DELETION_FAILED',
          item
        })
      ]
    ]).toJS();

    const newState = error(previousState, deleteFailed).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should delete existing error on ITEM_INSERT_SUCCEEDED', () => {
    const insertSucceeded = {
      type: 'ITEM_INSERT_SUCCEEDED',
      payload: {
        errorId: id1
      }
    };
    const previousState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id1,
        new Error({id: id1, errorMessage: insertErrorMessage})
      ],
      [
        id2,
        new Error({id: id2, errorMessage: deleteErrorMessage})
      ]
    ]);
    const expectedState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id2,
        new Error({id: id2, errorMessage: deleteErrorMessage})
      ]
    ]).toJS();

    const newState = error(previousState, insertSucceeded).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should delete existing error on ITEM_UPDATE_SUCCEEDED', () => {
    const updateSucceeded = {
      type: 'ITEM_UPDATE_SUCCEEDED',
      payload: {
        errorId: id1
      }
    };
    const previousState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id1,
        new Error({id: id1, errorMessage: updateErrorMessage})
      ],
      [
        id2,
        new Error({id: id2, errorMessage: insertErrorMessage})
      ]
    ]);
    const expectedState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id2,
        new Error({id: id2, errorMessage: insertErrorMessage})
      ]
    ]).toJS();

    const newState = error(previousState, updateSucceeded).toJS();

    expect(newState).toEqual(expectedState);
  });

  it('should delete existing error on ITEM_DELETION_SUCCEEDED', () => {
    const updateSucceeded = {
      type: 'ITEM_DELETION_SUCCEEDED',
      payload: {
        errorId: id1
      }
    };
    const previousState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id1,
        new Error({id: id1, errorMessage: deleteErrorMessage})
      ],
      [
        id2,
        new Error({id: id2, errorMessage: insertErrorMessage})
      ]
    ]);
    const expectedState: OrderedMap<Uuid, Error> = OrderedMap([
      [
        id2,
        new Error({id: id2, errorMessage: insertErrorMessage})
      ]
    ]).toJS();

    const newState = error(previousState, updateSucceeded).toJS();

    expect(newState).toEqual(expectedState);
  });
});
