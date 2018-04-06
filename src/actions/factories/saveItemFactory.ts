import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { IState } from '../../store/IState';
import { IItemsApiService } from '../../services/itemsApiService';
import { IAction } from '../../@types/IAction';
import { Key } from '../../@types/Key';
import {
  saveItemSuccess,
  saveItemFailed,
} from '../creators/listActions';

export const saveItemFactory =
  (fetchService: IItemsApiService) =>
    (itemKey: Key, itemValue: string): ThunkAction<Promise<IAction>, IState, {}> =>
      (dispatch: Dispatch<IAction>): Promise<IAction> =>
        fetchService.putItem(itemKey, itemValue)
          .then(() => dispatch(saveItemSuccess(itemKey)))
          .catch(error => dispatch(saveItemFailed(itemKey, error)));
