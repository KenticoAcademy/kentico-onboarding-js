import { Dispatch } from 'react-redux';

import { IState } from '../../store/IState';
import { IAction } from '../types/IAction';
import {
  deleteItemSuccess,
  deleteItemFailed,
  deleteItemOptimistic,
} from '../creators/listActions';

export const deleteItemFactory =
  (deleteItem: (key: Key) => Promise<Response>) =>
    (itemKey: Key): ThunkAction =>
      (dispatch: Dispatch<IState>): Promise<IAction> => {
        dispatch(deleteItemOptimistic(itemKey));

        return deleteItem(itemKey)
          .then(() => dispatch(deleteItemSuccess(itemKey)))
          .catch(error => dispatch(deleteItemFailed(itemKey, error)));
      };
