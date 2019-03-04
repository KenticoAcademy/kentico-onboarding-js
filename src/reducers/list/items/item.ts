import * as ActionType from '../../../actions/ActionTypes';
import { ListItem } from '../../../models/ListItem';
import { IAction } from '../../../actions/IAction';
import { itemProperties } from './itemProperties';

export const item = (state: ListItem = new ListItem(), action: IAction): ListItem => {
  switch (action.type) {
    case ActionType.FetchItemsSucceeded:
    case ActionType.FetchAddItemSucceeded:
      return new ListItem({
        ...action.payload,
        properties: itemProperties(undefined, action)
      });

    case ActionType.ToggleItem:
      return state.with({ isActive: !state.isActive, properties: itemProperties(state.properties, action) });

    case ActionType.FetchEditItemSucceeded: {
      return state.with({
        text: action.payload.text,
        isActive: false,
        lastUpdateTime: action.payload.lastUpdateTime,
        properties: itemProperties(state.properties, action)
      });
    }

    case ActionType.FetchDeleteItemStarted:
    case ActionType.FetchDeleteItemFailed:
    case ActionType.FetchEditItemStarted:
    case ActionType.FetchEditItemFailed: {
      return state.with({
        properties: itemProperties(state.properties, action)
      });
    }

    default:
      return state;
  }
};
