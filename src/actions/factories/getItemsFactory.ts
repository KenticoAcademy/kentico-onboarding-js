import { Dispatch } from 'react-redux';

import { IAction } from '../types/IAction';
import { IState } from '../../store/IState';
import {
  getItemsFailed,
  getItemsSuccess,
  itemsLoading,
  itemsLoadingDone,
} from '../creators/listActions';
import { IServerItem } from '../../models/IServerItem';

export const getItemsFactory = (getItems: () => Promise<Array<IServerItem>>) =>
  (): ThunkAction =>
    (dispatch: Dispatch<IState>): Promise<IAction> => {
      dispatch(itemsLoading());

      return getItems()
        .then(items => dispatch(getItemsSuccess(items)))
        .catch(error => dispatch(getItemsFailed(error)))
        .then(() => dispatch(itemsLoadingDone()));
    };
