import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { IState } from '../../store/IState';
import { IAction } from '../../@types/IAction';
import { Key } from '../../@types/Key';
import {
  deleteItemSuccess,
  deleteItemFailed,
  deleteItemOptimistic,
} from '../creators/listActions';

export const deleteItemFactory =
  (deleteItem: (key: Key) => Promise<Response>) =>
    (itemKey: Key): ThunkAction<Promise<IAction>, IState, {}> =>
      (dispatch: Dispatch<IAction>): Promise<IAction> => {
        dispatch(deleteItemOptimistic(itemKey));

        return deleteItem(itemKey)
          .then(() => dispatch(deleteItemSuccess(itemKey)))
          .catch(error => dispatch(deleteItemFailed(itemKey, error)));
      };
