import { ListError } from '../models/ListError';
import { generateId } from './generateId';
import { ErrorType } from '../models/ErrorType';

export const createErrorFactory = (getId: () => Uuid) =>
  (action: ErrorType, itemId: Uuid): ListError =>
    new ListError({
      itemId,
      errorId: getId(),
      action,
    });

export const createError = createErrorFactory(generateId);
