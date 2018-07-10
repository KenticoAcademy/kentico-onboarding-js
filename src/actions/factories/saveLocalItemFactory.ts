import { Dispatch } from 'react-redux';

import { IState } from '../../store/IState';
import { IAction } from '../types/IAction';
import { IServerItem } from '../../models/IServerItem';
import {
  addItemSuccess,
  addItemFailed,
  saveItemOptimistic,
  deleteItemOptimistic,
} from '../creators/listActions';

export const saveLocalItemFactory =
  (postItem: (itemValue: string) => Promise<IServerItem>) =>
    (itemKey: Key, itemValue: string): ThunkAction =>
      (dispatch: Dispatch<IState>): Promise<IAction> => {
        dispatch(saveItemOptimistic(itemKey));

        return postItem(itemValue)
          .then(item => {
            dispatch(deleteItemOptimistic(itemKey));
            return dispatch(addItemSuccess(item));
          })
          .catch(error => dispatch(addItemFailed(itemKey, error)));
      };
