import * as ActionType from '../actions/ActionTypes';
import { ListItem } from '../models/ListItem';

export const item = (state = null, action) => {
  switch (action.type) {
    case ActionType.AddItem:
      return new ListItem({
        id: action.payload.id,
        text: action.payload.text,
        isActive: false
      });

    case ActionType.ToggleItem:
      return state.merge({ isActive: !state.isActive });

    case ActionType.SaveItem:
      return state.merge({ text: action.payload.text, isActive: false });

    default:
      return state;
  }
};
