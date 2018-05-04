import {
  cancelFailedAddAction,
  cancelFailedDeleteAction,
  cancelFailedUpdateAction,
  deleteServerNote,
  retryAddNewNote,
  updateServerNote
} from '../../src/actions';
import { getFailedActionCallbacks } from '../../src/utils/getFailedActionCallbacks';
import { FailedAction } from '../../src/enums/FailedAction';
import {
  getFailedAddActionTooltipText,
  getFailedDeleteActionTooltipText,
  getFailedUpdateActionTooltipText
} from '../../src/utils/getTooltipText';

describe('GetFailedActionCallbacks', () => {

  it('should throw an error when no failed action occurred.', () =>
    expect(() => getFailedActionCallbacks(FailedAction.NO_FAILURE)).toThrow()
  );

  it('should return delete methods when delete action failed.', () => {
    const expectedCallbacks = {
      cancelFailedAction: cancelFailedDeleteAction,
      retryFailedAction: deleteServerNote,
      getFailedActionTooltipText: getFailedDeleteActionTooltipText,
    };

    const actualCallbacks = getFailedActionCallbacks(FailedAction.DELETE);

    expect(actualCallbacks).toEqual(expectedCallbacks);
  });

  it('should return add methods when add action failed.', () => {
    const expectedCallbacks = {
      cancelFailedAction: cancelFailedAddAction,
      retryFailedAction: retryAddNewNote,
      getFailedActionTooltipText: getFailedAddActionTooltipText,
    };

    const actualCallbacks = getFailedActionCallbacks(FailedAction.ADD);

    expect(actualCallbacks).toEqual(expectedCallbacks);
  });

  it('should return update methods when update action failed.', () => {
    const expectedCallbacks = {
      cancelFailedAction: cancelFailedUpdateAction,
      retryFailedAction: updateServerNote,
      getFailedActionTooltipText: getFailedUpdateActionTooltipText,
    };

    const actualCallbacks = getFailedActionCallbacks(FailedAction.UPDATE);

    expect(actualCallbacks).toEqual(expectedCallbacks);
  });
});
