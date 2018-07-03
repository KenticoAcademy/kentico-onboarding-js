import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { IState } from '../../store/IState';
import { IAction } from '../types/IAction';
import {
  saveItemSuccess,
  saveItemFailed,
  saveItemOptimistic,
} from '../creators/listActions';

export const saveItemFactory =
  (putItem: (key: Key, itemValue: string) => Promise<Response>) =>
    (itemKey: Key, itemValue: string): ThunkAction<Promise<IAction>, IState, {}> =>
      (dispatch: Dispatch<IAction>): Promise<IAction> => {
        dispatch(saveItemOptimistic(itemKey));

        return putItem(itemKey, itemValue)
          .then(() => dispatch(saveItemSuccess(itemKey)))
          .catch(error => dispatch(saveItemFailed(itemKey, error)));
      };
