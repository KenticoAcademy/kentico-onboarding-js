import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { IState } from '../../store/IState';
import { IAction } from '../../@types/IAction';
import {
  addItemSuccess,
  addItemFailed,
} from '../creators/listActions';
import { IServerItem } from '../../models/IServerItem';

export const addItemFactory =
  (postItem: (itemValue: string) => Promise<IServerItem>) =>
    (itemValue: string): ThunkAction<Promise<IAction>, IState, {}> =>
      (dispatch: Dispatch<IAction>): Promise<IAction> =>
        postItem(itemValue)
          .then(item => dispatch(addItemSuccess(item)))
          .catch(error => dispatch(addItemFailed(error)));
