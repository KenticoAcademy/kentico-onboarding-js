import { Dispatch } from 'react-redux';

import { IState } from '../../store/IState';
import { IAction } from '../types/IAction';
import {
  saveItemSuccess,
  saveItemFailed,
  saveItemOptimistic,
} from '../creators/listActions';

export const saveItemFactory =
  (putItem: (key: Key, itemValue: string) => Promise<Response>) =>
    (itemKey: Key, itemValue: string): ThunkAction =>
      (dispatch: Dispatch<IState>): Promise<IAction> => {
        dispatch(saveItemOptimistic(itemKey));

        return putItem(itemKey, itemValue)
          .then(() => dispatch(saveItemSuccess(itemKey)))
          .catch(error => dispatch(saveItemFailed(itemKey, error)));
      };
