import * as ActionType from '../../actions/ActionTypes';
import { ListItem } from '../../models/ListItem';
import { IAction } from '../../actions/IAction';

export const item = (state: ListItem = new ListItem(), action: IAction): ListItem => {
  switch (action.type) {
    case ActionType.AddItem:
      return new ListItem({
        ...action.payload,
        isActive: false,
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
