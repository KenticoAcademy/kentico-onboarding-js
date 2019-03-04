import { Dispatch } from 'redux';
import { IAction } from '../IAction';
import * as ActionType from '../ActionTypes';

const deletingStarts = (id: Uuid): IAction => ({
  type: ActionType.FetchDeleteItemStarted,
  payload: {
    id
  }
});

const deletingFailed = (id: Uuid, errorMessage: string): IAction => ({
  type: ActionType.FetchDeleteItemFailed,
  payload: {
    id,
    errorMessage
  }
});

export const deletingSucceeded = (id: Uuid): IAction => ({
  type: ActionType.FetchDeleteItemSucceeded,
  payload: {
    id
  }
});

interface IRequestDeleteItemCreatorDependency {
  readonly deleteItem: (id: Uuid) => Promise<void>;
}

export const requestDeleteItemCreator = (dependency: IRequestDeleteItemCreatorDependency) => (id: Uuid) =>
  async (dispatch: Dispatch): Promise<IAction> => {
    dispatch(deletingStarts(id));

    try {
      await dependency.deleteItem(id);

      return dispatch(deletingSucceeded(id));
    } catch (error) {
      return dispatch(deletingFailed(id, error.message));
    }
  };
