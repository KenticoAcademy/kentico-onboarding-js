import { ErrorsState } from '../../store/types/ErrorsState';
import { ListError } from '../../models/ListError';
import { IListAction } from '../../actions/types/IListAction';
import {
  CLOSE_ADD_ERROR,
  CLOSE_DELETE_ERROR, CLOSE_SAVE_ERROR,
  ITEM_ADD_FAILED,
  ITEM_ADD_STARTED,
  ITEM_DELETE_FAILED,
  ITEM_DELETE_STARTED, ITEM_SAVE_FAILED,
  ITEM_SAVE_STARTED,
} from '../../actions/types/listActionTypes';
import { OrderedMap } from 'immutable';

export const errors = (
  state: ErrorsState = OrderedMap<Uuid, ListError>(),
  action: IListAction,
): ErrorsState => {
  switch (action.type) {
    case ITEM_DELETE_FAILED:
    case ITEM_ADD_FAILED:
    case ITEM_SAVE_FAILED:
      return state.set(action.payload.error.errorId, action.payload.error);

    case ITEM_ADD_STARTED:
    case ITEM_SAVE_STARTED:
    case ITEM_DELETE_STARTED:
    case CLOSE_ADD_ERROR:
    case CLOSE_DELETE_ERROR:
    case CLOSE_SAVE_ERROR: {
      const foundError = state.valueSeq()
        .find((error: ListError) => error.itemId === action.payload.id);
      if (foundError)
        return state.delete(foundError.errorId);
      return state;
    }

    default:
      return state;
  }
};
