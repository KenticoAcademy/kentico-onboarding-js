import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { IAction } from '../../@types/IAction';
import { IItemsApiService } from '../../services/itemsApiService';
import { IState } from '../../store/IState';
import { IServerItem } from '../../models/IServerItem';

export const getItemsFactory =
  (fetchService: IItemsApiService, itemsFetchedSuccess: (items: Array<IServerItem>) => IAction, itemsFetchedFail: (error: string) => IAction) =>
    (): ThunkAction<Promise<IAction>, IState, {}> =>
      (dispatch: Dispatch<IAction>): Promise<IAction> =>
        fetchService.getItems()
          .then(items => dispatch(itemsFetchedSuccess(items)))
          .catch(error => dispatch(itemsFetchedFail(error)));
