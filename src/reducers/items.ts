import { OrderedMap } from 'immutable';
import { CREATE_ITEM } from '../actions/actionTypes';
import { ItemRecord, ItemRecordInterface } from '../models/ItemRecord';
import { item } from './item';
import { Action } from '../actions/actionInterface';

export const items = (state = OrderedMap<string, ItemRecordInterface>(), action: Action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return (
        state
          .set(action.payload.id,
               new ItemRecord({
              id: action.payload.id,
              text: action.payload.text,
            }),
          )
      );

    default:
      return item(state, action);
  }
};
