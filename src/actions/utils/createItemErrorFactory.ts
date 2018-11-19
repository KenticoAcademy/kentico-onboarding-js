import { ErrorAction } from '../types/ErrorAction';
import { AddItemErrorAction } from '../types/itemsActionTypes';
import { ItemError } from '../../models/Error';
import { addItemError } from '../itemsActions';

export const createItemErrorFactory = (generateId: () => Guid) =>
  (message: string, errorType: ErrorAction, itemId: Guid): AddItemErrorAction => {
    const errorId = generateId();
    const itemError = new ItemError({
      id: errorId,
      message,
      action: errorType,
    });
    return addItemError(itemId, itemError);
  };
