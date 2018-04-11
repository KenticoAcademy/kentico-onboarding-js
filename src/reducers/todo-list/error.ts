import { Error } from '../../models/Error';
import { IAction } from '../../actions/IAction';
import { OrderedMap } from 'immutable';
import { Uuid } from '../../utils/generateId';
import {
  ITEM_DELETION_FAILED,
  ITEM_DELETION_SUCCEEDED,
  ITEM_ERROR_CLOSE,
  ITEM_INSERT_FAILED,
  ITEM_INSERT_SUCCEEDED,
  ITEM_UPDATE_FAILED,
  ITEM_UPDATE_SUCCEEDED
} from '../../constants/actionTypes';

export const error =
  (previousState: OrderedMap<Uuid, Error> = OrderedMap<Uuid, Error>(), action: IAction) => {
    switch (action.type) {
      case ITEM_INSERT_SUCCEEDED:
      case ITEM_UPDATE_SUCCEEDED:
      case ITEM_DELETION_SUCCEEDED:
        return previousState.delete(action.payload.errorId);

      case ITEM_INSERT_FAILED:
        return previousState.set(
          action.payload.errorId,
          new Error({
            id: action.payload.errorId,
            action: action.type,
            errorMessage: action.payload.message
          })
        );
      case ITEM_UPDATE_FAILED:
        return previousState.set(
          action.payload.errorId,
          new Error({
            id: action.payload.errorId,
            action: action.type,
            errorMessage: action.payload.message
          })
        );
      case ITEM_DELETION_FAILED:
        return previousState.set(
          action.payload.errorId,
          new Error({
            id: action.payload.errorId,
            action: action.type,
            errorMessage: action.payload.message
          })
        );
      case ITEM_ERROR_CLOSE:
        return previousState.delete(action.payload.id);

      default:
        return previousState;
    }
  };
