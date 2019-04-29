import { Dispatch } from 'redux';
import { IAction } from '../IAction';
import * as ActionType from '../ActionTypes';
import { IListItem } from '../../models/ListItem';

const editingStarts = (id: Uuid): IAction => ({
  type: ActionType.FetchEditItemStarted,
  payload: {
    id
  }
});

const editingFailed = (id: Uuid, errorMessage: string): IAction => ({
  type: ActionType.FetchEditItemFailed,
  payload: {
    id,
    errorMessage
  }
});

export const editingSucceeded = (item: IListItem): IAction => ({
  type: ActionType.FetchEditItemSucceeded,
  payload: {
    ...item
  }
});


interface IRequestEditItemCreatorDependency {
  readonly editItem: (id: Uuid, text: string) => Promise<IListItem>;
}

export const requestEditItemCreator = (dependency: IRequestEditItemCreatorDependency) => (id: Uuid, text: string) =>
  async (dispatch: Dispatch): Promise<IAction> => {
    dispatch(editingStarts(id));

    try {
      const item = await dependency.editItem(id, text);

      return dispatch(editingSucceeded(item));
    } catch (error) {
      return dispatch(editingFailed(id, error.message));
    }
  };

