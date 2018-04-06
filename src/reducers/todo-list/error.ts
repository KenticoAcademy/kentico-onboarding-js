import { Error } from '../../models/Error';
import { IAction } from '../../actions/IAction';
import { OrderedMap } from 'immutable';
import { Uuid } from '../../utils/generateId';
import {
  ITEM_DELETION_FAILED,
  ITEM_DELETION_SUCCEEDED,
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
      case ITEM_UPDATE_FAILED:
      case ITEM_DELETION_FAILED:
        return previousState.set(
          action.payload.errorId,
          new Error({
            id: action.payload.errorId,
            errorMessage: action.payload.errorMessage
          })
        );
      default:
        return previousState;
    }
  };
