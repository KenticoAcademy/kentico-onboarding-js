import {
  OrderedMap
} from 'immutable';
import { Reducer } from 'redux';
import {
  Item
} from '../../models/Item';
import {
  actionTypes
} from '../../constants/actionTypes';
import { IAction } from '../../actions/IAction';
import { ItemId } from '../../models/ItemId';

const DEFAULT_STATE = OrderedMap<ItemId, Item>();

export const byId: Reducer<OrderedMap<ItemId, Item>> = (state = DEFAULT_STATE, action: IAction) => {

  switch (action.type) {

    case actionTypes.ADD_ITEM:
      return state.set(action.payload.id, new Item({
        id: action.payload.id,
        text: action.payload.text,
        synchronized: action.payload.synchronized,
      }));

    case actionTypes.UPDATE_ITEM:
      return state.update(action.payload.id, (item) => item.with({
        text: item.textUpdate,
        isBeingEdited: false,
      }));

    case actionTypes.DELETE_ITEM:
      return state.delete(action.payload.id);

    case actionTypes.TOGGLE_EDITING:
      return state.update(action.payload.id, (item) => item.with({
        isBeingEdited: action.payload.isBeingEdited,
        textUpdate: action.payload.isBeingEdited ? item.text : item.textUpdate,
      }));

    case actionTypes.TOGGLE_SYNCHRONIZED:
      return state.update(action.payload.id, (item) => item.with({
        synchronized: action.payload.synchronized,
      }));

    case actionTypes.EDIT_ITEM_TEXT:
      return state.update(action.payload.id, (item) => item.with({
        textUpdate: action.payload.updatedText,
      }));

    case actionTypes.RECEIVE_ITEMS: {
      if (!action || !action.payload || !action.payload.items ) return state;
      const itemsArray = action.payload.items.map((item: any) => [[item.Id].toString(), new Item({ id: item.Id, text: item.Text})]);
      return OrderedMap(itemsArray);
    }

    case actionTypes.REQUEST_FAILED_FOR_ITEM: {
      return state.update(action.payload.id, (item) => item.with({
        errorMessages: item.errorMessages.set(action.payload.errorType, action.payload.errorMessage),
      }));
    }

    case actionTypes.CLEAR_ERROR_MESSAGE: {
      return state.update(action.payload.id, (item: Item) => item.with({
        errorMessages: item.errorMessages.remove(action.payload.errorType),
      }));
    }

    case actionTypes.SYNCHRONIZE_ITEM_ID: {
      const newState = state.mapEntries((entry) => {
        const key: ItemId = entry ? entry[0] : null;
        const value: Item = entry ? entry[1] : null;

        if (key === action.payload.oldId) {
          const newValue = value.with({id: action.payload.newId});
          return [action.payload.newId, newValue];
        }else
          return [key, value];
      });
      return OrderedMap<ItemId, Item>(newState);
    }

    case actionTypes.MODIFY_DELETING:
      return state.update(action.payload.id, (item) => item.with({
        isBeingDeleted: action.payload.isBeingDeleted,
      }));

    case actionTypes.RESET_ITEM:
      return state.update(action.payload.id, (item) => item.with({
        isBeingEdited: false,
        isBeingDeleted: false,
        errorMessages: item.errorMessages.filter((_ , key) => !action.payload.errorTypes.includes(key)).toMap(),
        synchronized: true,
      }));

    default:
      return state;
  }
};
