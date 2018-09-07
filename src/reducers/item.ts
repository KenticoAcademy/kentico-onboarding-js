import { OrderedMap } from 'immutable';
import { ItemRecordInterface } from '../models/ItemRecord';
import { Action } from '../actions/actionInterface';
import {
DELETE_ITEM,
EDIT_ITEM,
} from '../actions/actionTypes';

export const item = (state = OrderedMap<string, ItemRecordInterface>(), action: Action) => {
  switch (action.type) {
    case EDIT_ITEM:
      return (
        state
          .setIn([action.payload.id, 'text'], action.payload.text)
      );

    case DELETE_ITEM:
      return (
        state
          .delete(action.payload.id)
      );

    default:
      return state;
  }
};
