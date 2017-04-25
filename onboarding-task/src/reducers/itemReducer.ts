import { IAction } from '../actions/IAction';
import { Item } from '../models/Item';
import { CREATE_ITEM, EDIT_ITEM, RECEIVE_ITEMS } from '../actions/actionTypes';

const itemReducer = (state = new Item(),
                     action: IAction,) => {
  switch (action.type) {
    case EDIT_ITEM:
      return state.set('value', action.payload.value) as Item;

    case CREATE_ITEM:
      return new Item({
        id: action.payload.id,
        value: action.payload.value,
      });

    case RECEIVE_ITEMS:
      const item = new Item({
        id: action.payload.item.id,
        value: action.payload.item.value,
      });
      return item;

    default:
      return state;
  }
};

export { itemReducer };

