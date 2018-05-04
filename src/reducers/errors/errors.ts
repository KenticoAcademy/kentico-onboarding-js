import { OrderedMap } from 'immutable';
import { IAction } from '../../actions/IAction';
import { ApplicationError } from '../../models/ApplicationError';
import {
  CANCEL_FAILED_ADD_ACTION,
  CANCEL_FAILED_DELETE_ACTION,
  CANCEL_FAILED_UPDATE_ACTION,
  DELETING_NOTE_FROM_SERVER_FAILURE,
  LOADING_NOTES_FAILURE,
  SENDING_NOTE_TO_SERVER_FAILURE,
  START_LOADING_NOTES,
  UPDATING_NOTE_ON_SERVER_FAILURE
} from '../../constants/actionTypes';
import { FailedAction } from '../../enums/FailedAction';

const addError = (state: OrderedMap<Guid, ApplicationError>, payload: { noteId: Guid, errorId: Guid, errorDescription: string }, failedAction: FailedAction): OrderedMap<Guid, ApplicationError> => {
  const { errorId, errorDescription } = payload;
  const errorToAdd = new ApplicationError({
    id: errorId,
    errorDescription,
    failedAction,
  });

  return state
    .set(errorId, errorToAdd);
};

const removeError = (state: OrderedMap<Guid, ApplicationError>, payload: { errorId: Guid }): OrderedMap<Guid, ApplicationError> =>
  state.delete(payload.errorId);

export const errors = (state = OrderedMap<Guid, ApplicationError>(), action: IAction): OrderedMap<Guid, ApplicationError> => {
  switch (action.type) {
    case DELETING_NOTE_FROM_SERVER_FAILURE:
      return addError(state, action.payload, FailedAction.DELETE);

    case SENDING_NOTE_TO_SERVER_FAILURE:
      return addError(state, action.payload, FailedAction.ADD);

    case UPDATING_NOTE_ON_SERVER_FAILURE:
      return addError(state, action.payload, FailedAction.UPDATE);

    case LOADING_NOTES_FAILURE:
      return addError(state, action.payload, FailedAction.GET);

    case CANCEL_FAILED_DELETE_ACTION:
    case CANCEL_FAILED_ADD_ACTION:
    case CANCEL_FAILED_UPDATE_ACTION:
    case START_LOADING_NOTES:
      return removeError(state, action.payload);

    default:
      return state;
  }
};
