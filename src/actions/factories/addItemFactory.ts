import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { IState } from '../../store/IState';
import { IAction } from '../types/IAction';
import {
  addItemOptimistic,
  deleteItemOptimistic,
  addItemSuccess,
  addItemFailed,
} from '../creators/listActions';
import { IServerItem } from '../../models/IServerItem';

export const addItemFactory =
  (postItem: (itemValue: string) => Promise<IServerItem>, generateItemKey: () => Key) =>
    (itemValue: string): ThunkAction<Promise<IAction>, IState, {}> =>
      (dispatch: Dispatch<IAction>): Promise<IAction> => {
        const optimisticKey = generateItemKey();
        dispatch(addItemOptimistic(optimisticKey, itemValue));

        return postItem(itemValue)
          .then(item => {
            dispatch(deleteItemOptimistic(optimisticKey));
            return dispatch(addItemSuccess(item));
          })
          .catch(error => dispatch(addItemFailed(optimisticKey, error)));
      };
