import { OrderedMap } from 'immutable';
import { DELETE_ITEM, FETCH_ITEMS_RECEIVE, UPDATE_ITEM, POST_ITEM_RECEIVE } from '../actions/actionTypes';
import { IAction } from '../actions/IAction';
import { Item } from '../models/Item';

const items = (state = OrderedMap(), action: IAction) => {
  switch (action.type) {
    case FETCH_ITEMS_RECEIVE:
      return OrderedMap (
        action.payload.items.map((item: any) => [item.id, new Item({id: item.id, text: item.text})])
      );

    case POST_ITEM_RECEIVE:
      return state.set(action.payload.item.id, new Item({id: action.payload.item.id, text: action.payload.item.text}));

    case DELETE_ITEM:
      return state.delete(action.payload.id);

    case UPDATE_ITEM:
      return state.updateIn([action.payload.id], item => {
        return item.set('text', action.payload.text);
      });

    default:
      return state;
  }
};

export { items };
