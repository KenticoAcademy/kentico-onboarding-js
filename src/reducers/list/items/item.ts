import * as ActionType from '../../../actions/ActionTypes';
import { ListItem } from '../../../models/ListItem';
import { IAction } from '../../../actions/IAction';
import { itemProperties } from './itemProperties';
// It's disabled because list is not re-rendered (context doesn't work) and this is unnecessary without working context.
// import { getLocalDateTime } from '../../utils/getLocalDateTime';

export const item = (state: ListItem = new ListItem(), action: IAction): ListItem => {
  switch (action.type) {
    case ActionType.FetchItemsSucceeded:
    case ActionType.FetchAddItemSucceeded:
      return new ListItem({
        ...action.payload,
        properties: itemProperties(undefined, action)
        // creationTime: getLocalDateTime(action.payload.creationTime),
        // lastUpdateTime: getLocalDateTime(action.payload.lastUpdateTime)
      });

    case ActionType.ToggleItem:
      return state.with({ isActive: !state.isActive, properties: itemProperties(state.properties, action) });

    case ActionType.FetchEditItemSucceeded: {
      // return state.with({text: action.payload.text, isActive: false, lastUpdateTime: getLocalDateTime(action.payload.lastUpdateTime)});
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
