import { Map } from 'immutable';
import * as ActionType from '../../../actions/ActionTypes';
import { item } from './item';
import { IAction } from '../../../actions/IAction';
import { ListItem } from '../../../models/ListItem';

export const items = (state = Map<Uuid, ListItem>(), action: IAction): Map<Uuid, ListItem> => {
  switch (action.type) {
    case ActionType.FetchAddItemSucceeded:
      return state.set(action.payload.id, item(undefined, action));

    case ActionType.FetchEditItemSucceeded:
    case ActionType.FetchEditItemStarted:
    case ActionType.FetchEditItemFailed:
    case ActionType.FetchDeleteItemStarted:
    case ActionType.FetchDeleteItemFailed:
    case ActionType.ToggleItem: {
      const existingItem = state.get(action.payload.id);
      const editedItem = item(existingItem, action);
      return state.set(action.payload.id, editedItem);
    }

    case ActionType.FetchDeleteItemSucceeded:
      return state.delete(action.payload.id);

    case ActionType.FetchItemsSucceeded:
      let map = Map<Uuid, ListItem>();
      for (const i of action.payload.items) {
        map = map.set(i.id, item(undefined, { type: action.type, payload: i }));
      }
      return map;

    default:
      return state;
  }
};
