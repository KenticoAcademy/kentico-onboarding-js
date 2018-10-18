import { OrderedMap } from 'immutable';
import { Reducer } from 'redux';
import { Item } from '../../models/Item';
import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../../actions/IAction';
import { errorMessageTypes } from '../../constants/errorMessageTypes';

const DEFAULT_STATE = OrderedMap<ItemId, Item>();

export const byId: Reducer<OrderedMap<ItemId, Item>> = (state = DEFAULT_STATE, action: IAction) => {

  switch (action.type) {

    case actionTypes.ADD_ITEM:
      return state.set(action.payload.id, new Item({
        id: action.payload.id,
        text: action.payload.text,
        isNotSynchronized: action.payload.isNotSynchronized,
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
        textUpdate: item.isBeingEdited ? item.textUpdate : item.text,
        isBeingEdited: !item.isBeingEdited,
      }));

    case actionTypes.UPDATE_SUCCEEDED:
      return state.update(action.payload.id, (item) => item.with({
        isNotSynchronized: false,
        errorMessages: item.errorMessages.clear(),
      }));

    case actionTypes.EDIT_ITEM_TEXT:
      return state.update(action.payload.id, (item) => item.with({
        textUpdate: action.payload.updatedText,
      }));

    case actionTypes.RECEIVE_ITEMS: {
      if (!action || !action.payload || !action.payload.items) return state;
      const itemsArray = action.payload.items.map((item: any) => [[item.Id].toString(), new Item({id: item.Id, text: item.Text})]);
      return OrderedMap(itemsArray);
    }

    case actionTypes.REQUEST_FAILED_FOR_ITEM: {
      return state.update(action.payload.id, (item) => item.with({
        errorMessages: item.errorMessages.set(action.payload.errorType, action.payload.errorMessage),
      }));
    }

    case actionTypes.DELETING_FAILED_FOR_ITEM: {
      return state.update(action.payload.id, (item) => item.with({
        errorMessages: item.errorMessages.set(errorMessageTypes.DELETE, action.payload.errorMessage),
        isNotSynchronized: false,
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
        } else
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
        errorMessages: item.errorMessages.filter((_, key) => !action.payload.errorTypes.includes(key)).toMap(),
        isNotSynchronized: false,
      }));

    case actionTypes.PRE_UPDATE_ITEM:
      return state.update(action.payload.id, (item) => item.with({
        isNotSynchronized: true,
        isBeingEdited: false,
        text: item.textUpdate,
        errorMessages: item.errorMessages.remove(errorMessageTypes.UPLOAD),
      }));

    case actionTypes.PRE_REMOVE_ITEM:
      return state.update(action.payload.id, (item) => item.with({
        isBeingDeleted: true,
        isNotSynchronized: true,
        isBeingEdited: false,
      }));

    default:
      return state;
  }
};
