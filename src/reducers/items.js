import { OrderedMap } from 'immutable';
import { CREATE_ITEM, } from '../actions/actionTypes';
import { ItemRecord } from '../models/ItemRecord';
import { item } from './item';

export const initialState = new OrderedMap();

export const items = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return (
        state
          .set(action.payload.id,
            new ItemRecord({
              id: action.payload.id,
              text: action.payload.text,
            }))
      );

    default:
      return item(state, action);
  }
};
