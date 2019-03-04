import { Map } from 'immutable';
import * as ActionType from '../../../actions/ActionTypes';
import { item } from './item';
import { IAction } from '../../../actions/IAction';
import { ListItem } from '../../../models/ListItem';

export const items = (state = Map<Uuid, ListItem>(), action: IAction): Map<Uuid, ListItem> => {
  switch (action.type) {
    case ActionType.AddItem:
      return state.set(action.payload.id, item(undefined, action));

    case ActionType.SaveItem:
    case ActionType.ToggleItem: {
      const existingItem = state.get(action.payload.id);
      const editedItem = item(existingItem, action);
      return state.set(action.payload.id, editedItem);
    }

    case ActionType.DeleteItem:
      return state.delete(action.payload.id);

    default:
      return state;
  }
};
