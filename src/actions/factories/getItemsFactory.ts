import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { IAction } from '../../@types/IAction';
import { IItemsApiService } from '../../services/itemsApiService';
import { IState } from '../../store/IState';
import {
  getItemsFailed,
  getItemsSuccess,
} from '../creators/listActions';

export const getItemsFactory =
  (fetchService: IItemsApiService) =>
    (): ThunkAction<Promise<IAction>, IState, {}> =>
      (dispatch: Dispatch<IAction>): Promise<IAction> =>
        fetchService.getItems()
          .then(items => dispatch(getItemsSuccess(items)))
          .catch(error => dispatch(getItemsFailed(error)));
