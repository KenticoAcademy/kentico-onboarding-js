import { Dispatch } from 'redux';
import { IAction } from '../IAction';
import * as ActionType from '../ActionTypes';

import { IListItem } from '../../models/ListItem';

const addingStarts = (itemText: string): IAction => ({
  type: ActionType.FetchAddItemStarted,
  payload: {
    text: itemText
  }
});

const addingFailed = (errorMessage: string): IAction => ({
  type: ActionType.FetchAddItemFailed,
  payload: {
    errorMessage
  }
});

export const addingSucceeded = (item: IListItem): IAction => ({
  type: ActionType.FetchAddItemSucceeded,
  payload: {
    ...item
  }
});

interface IAddItemCreatorDependency {
  readonly addItem: (itemText: string) => Promise<IListItem>;
}

export const requestAddItemCreator = (dependency: IAddItemCreatorDependency) => (itemText: string) =>
  async (dispatch: Dispatch): Promise<IAction> => {
    dispatch(addingStarts(itemText));

    try {
      const item = await dependency.addItem(itemText);

      return dispatch(addingSucceeded(item));
    } catch (error) {
      return dispatch(addingFailed(error.message));
    }
  };



