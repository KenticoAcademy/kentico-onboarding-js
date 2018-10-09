import { AddItemErrorAction } from '../types/itemsActionTypes';

export const addItemErrorCreator = (idGenerator: () => Guid) => (itemId: Guid, error: string, action: ErrorAction): AddItemErrorAction => ({
  type: 'ADD_ITEM_ERROR',
  payload: {
    itemId,
    errorId: idGenerator(),
    error,
    action,
  },
});
