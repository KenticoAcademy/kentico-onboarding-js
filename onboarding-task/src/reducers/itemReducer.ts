import { IAction } from '../actions/IAction';
import { Item } from '../models/Item';
import { CREATE_ITEM, EDIT_ITEM, RECEIVE_ITEM_CREATED, RECEIVE_ITEMS } from '../actions/actionTypes';

const itemReducer = (state = new Item(),
                     action: IAction,) => {
  switch (action.type) {
    case EDIT_ITEM:
      return state.set('value', action.payload.value) as Item;

    case CREATE_ITEM:
      return new Item({
        ueid: action.payload.ueid,
        value: action.payload.value,
      });

    case RECEIVE_ITEM_CREATED:
    case RECEIVE_ITEMS:
      return new Item({
        id: action.payload.item.id,
        ueid: action.payload.item.ueid,
        value: action.payload.item.value,
      });

    default:
      return state;
  }
};

export { itemReducer };

