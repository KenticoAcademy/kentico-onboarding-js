import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { IState } from '../../store/IState';
import { IItemsApiService } from '../../services/itemsApiService';
import { IAction } from '../../@types/IAction';
import {
  addItemSuccess,
  addItemFailed,
} from '../creators/listActions';

export const addItemFactory =
  (fetchService: IItemsApiService) =>
    (itemValue: string): ThunkAction<Promise<IAction>, IState, {}> =>
      (dispatch: Dispatch<IAction>): Promise<IAction> =>
        fetchService.postItem(itemValue)
          .then(item => dispatch(addItemSuccess(item)))
          .catch(error => dispatch(addItemFailed(error)));
