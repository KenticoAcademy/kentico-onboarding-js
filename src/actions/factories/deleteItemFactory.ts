import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { IState } from '../../store/IState';
import { IItemsApiService } from '../../services/itemsApiService';
import { IAction } from '../../@types/IAction';
import { Key } from '../../@types/Key';
import {
  deleteItemSuccess,
  deleteItemFailed,
} from '../creators/listActions';

export const deleteItemFactory =
  (fetchService: IItemsApiService) =>
    (itemKey: Key): ThunkAction<Promise<IAction>, IState, {}> =>
      (dispatch: Dispatch<IAction>): Promise<IAction> =>
        fetchService.deleteItem(itemKey)
          .then(() => dispatch(deleteItemSuccess(itemKey)))
          .catch(error => dispatch(deleteItemFailed(itemKey, error)));
