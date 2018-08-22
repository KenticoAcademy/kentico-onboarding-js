import * as ActionType from '../../actions/ActionTypes';
import { ListItem } from '../../models/ListItem';
import { IAction } from '../../actions/IAction';

export const item = (state: ListItem = new ListItem(), action: IAction): ListItem => {
  switch (action.type) {
    case ActionType.AddItem:
      return new ListItem({
        id: action.payload.id,
        text: action.payload.text,
        isActive: false,
        creationTime: action.payload.creationTime,
        lastUpdateTime: action.payload.creationTime
      });

    case ActionType.ToggleItem:
      return state.with({isActive: !state.isActive});

    case ActionType.SaveItem: {
      return state.with({text: action.payload.text, isActive: false, lastUpdateTime: action.payload.updateTime});
    }
    default:
      return state;
  }
};
