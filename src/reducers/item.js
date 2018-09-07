import {
  CREATE_ITEM,
  EDIT_ITEM,
} from '../actions/actionTypes';
import { ItemRecord } from '../models/ItemRecord';

export const item = (state = new ItemRecord(), action) => {
  switch (action.type) {
    case CREATE_ITEM:
    case EDIT_ITEM:
      return (
        new ItemRecord({
          id: action.payload.id,
          text: action.payload.text,
        })
      );

    default:
      return state;
  }
};
