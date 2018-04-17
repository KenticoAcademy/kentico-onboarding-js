import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { IState } from '../../store/IState';
import { IAction } from '../../@types/IAction';
import { Key } from '../../@types/Key';
import { IServerItem } from '../../models/IServerItem';
import {
  addItemSuccess,
  addItemFailed,
  saveItemOptimistic,
  deleteItemOptimistic,
} from '../creators/listActions';

export const saveLocalItemFactory =
  (postItem: (itemValue: string) => Promise<IServerItem>) =>
    (itemKey: Key, itemValue: string): ThunkAction<Promise<IAction>, IState, {}> =>
      (dispatch: Dispatch<IAction>): Promise<IAction> => {
        dispatch(saveItemOptimistic(itemKey));

        return postItem(itemValue)
          .then(item => {
            dispatch(deleteItemOptimistic(itemKey));
            return dispatch(addItemSuccess(item));
          })
          .catch(error => dispatch(addItemFailed(itemKey, error)));
      };
