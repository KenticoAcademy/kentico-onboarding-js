import { getErrorById } from '../../../src/selectors/errors/getErrorById';
import { ApplicationError } from '../../../src/models/ApplicationError';
import { FailedAction } from '../../../src/enums/FailedAction';
import { OrderedMap } from 'immutable';

describe('Selector getErrorById ', () => {
  it('should return correct ApplicationError by id.', () => {
    const expectedError = new ApplicationError({
      id: 'error1',
      failedAction: FailedAction.UPDATE,
      errorDescription: 'Test error'
    });

    const errors = OrderedMap<Guid, ApplicationError>([
      ['error1', expectedError],
    ]);

    const actualError = getErrorById(errors, 'error1');

    expect(actualError).toEqual(expectedError);
  });

  it('should throw Error when errorId parameter is undefined', () => {
    const errors = OrderedMap<Guid, ApplicationError>();

    expect(() => {
      getErrorById(errors, undefined);
    }).toThrow();
  });
});
