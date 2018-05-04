import { FailedAction } from '../enums/FailedAction';
import {
  cancelFailedAddAction,
  cancelFailedDeleteAction,
  cancelFailedUpdateAction,
  deleteServerNote,
  retryAddNewNote,
  updateServerNote
} from '../actions';
import { IAction } from '../actions/IAction';
import {
  getFailedAddActionTooltipText,
  getFailedDeleteActionTooltipText,
  getFailedUpdateActionTooltipText
} from './getTooltipText';

interface FailedActionCallbacks {
  readonly cancelFailedAction: (noteId: Guid, serverSynchronizedText: string, errorId: Guid) => IAction;
  readonly retryFailedAction: (id: Guid, text: string) => Thunk;
  readonly getFailedActionTooltipText: () => string;
}

export const getFailedActionCallbacks = (actionType: FailedAction): FailedActionCallbacks => {
  switch (actionType) {
    case FailedAction.DELETE:
      return {
        cancelFailedAction: cancelFailedDeleteAction,
        retryFailedAction: deleteServerNote,
        getFailedActionTooltipText: getFailedDeleteActionTooltipText,
      };

    case FailedAction.UPDATE:
      return {
        cancelFailedAction: cancelFailedUpdateAction,
        retryFailedAction: updateServerNote,
        getFailedActionTooltipText: getFailedUpdateActionTooltipText,
      };

    case FailedAction.ADD:
      return {
        cancelFailedAction: cancelFailedAddAction,
        retryFailedAction: retryAddNewNote,
        getFailedActionTooltipText: getFailedAddActionTooltipText,
      };

    case FailedAction.NO_FAILURE:
      throw Error('No callbacks for action which did not fail!');

    default:
      throw Error('Unknown failed action!');
  }
};
