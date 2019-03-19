import { ErrorAction } from '../types/ErrorAction';
import { AddItemErrorAction } from '../types/itemsActionTypes';
import { ItemError } from '../../models/Error';
import { addItemError } from '../itemsActions';

export const createItemErrorFactory = (generateId: () => Guid, errorType: ErrorAction) =>
  (message: string, itemId: Guid, oldText?: string): AddItemErrorAction => {
    const errorId = generateId();
    const itemError = new ItemError({
      id: errorId,
      message,
      action: errorType,
      oldText,
    });
    return addItemError(itemId, itemError);
  };
