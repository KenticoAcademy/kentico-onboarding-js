import { IAppState } from '../../models/IAppState';
import { Dispatch } from 'react-redux';
import { Uuid } from '../../utils/generateId';
import { IAction } from '../IAction';

export const optimisticDeleteFactory =
  (deleteLocally: (id: Uuid) => IAction,
   deleteFromServer: (id: Uuid) => (dispatch: Dispatch<IAppState>) => Promise<void | IAction>) =>
    (id: Uuid) =>
      (dispatch: Dispatch<IAppState>): Promise<void | IAction> => {
        dispatch(deleteLocally(id));
        return dispatch(deleteFromServer(id));
      };
