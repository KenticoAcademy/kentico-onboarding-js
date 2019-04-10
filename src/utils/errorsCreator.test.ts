import { createErrorFactory } from './errorsCreator';
import { ErrorType } from '../models/ErrorType';

describe('Create error', () => {
  it('should create error with given action, message, id and item id', () => {
    const action = ErrorType.ADD;
    const itemId = '00000000-0000-0000-0000-000000000001';
    const errorId = '00000000-0000-0000-0000-000000000002';

    const error = createErrorFactory(() => errorId)(action, itemId);

    expect(error.errorId).toEqual(errorId);
    expect(error.itemId).toEqual(itemId);
    expect(error.action).toEqual(action);
  });
});
