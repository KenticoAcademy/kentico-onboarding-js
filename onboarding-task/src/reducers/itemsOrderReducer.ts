import { OrderedSet } from 'immutable';

import { IAction } from '../actions/IAction';
import { CREATE_ITEM, DELETE_ITEM, RECEIVE_ITEM_CREATED, RECEIVE_ITEMS } from '../actions/actionTypes';

const itemsOrderReducer = (state = OrderedSet<string>(),
                           action: IAction,) => {
  switch (action.type) {
    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case CREATE_ITEM:
      return state.add(action.payload.ueid);

    case RECEIVE_ITEMS:
      return OrderedSet<string>(
        action.payload.items
          .map((item: any) => item.id)
      );

    case RECEIVE_ITEM_CREATED:
      return state
        .delete(action.payload.item.ueid)
        .add(action.payload.item.id);

    default:
      return state;
  }
};

export { itemsOrderReducer };
