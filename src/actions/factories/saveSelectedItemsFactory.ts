import { Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

import { IState } from '../../store/IState';
import { IItemsApiService } from '../../services/itemsApiService';
import { IAction } from '../../@types/IAction';
import { Key } from '../../@types/Key';
import { saveItemFactory } from './saveItemFactory';
import { groupActionsToggle } from '../creators/listActions';

export const saveSelectedItemsFactory =
  (fetchService: IItemsApiService) =>
    (selectedKeys: Array<Key>): ThunkAction<Promise<IAction>, IState, {}> =>
      (dispatch: Dispatch<IAction>, getState: () => IState): Promise<IAction> => {
        dispatch(groupActionsToggle());


        return Promise
          .all(selectedKeys.map(x =>
            saveItemFactory(fetchService)
              (x, getState()
                .list
                .items
                .get(x)
                .temporaryValue)
                (dispatch, getState, {}))
          )
          .catch()
          .then(() => dispatch(groupActionsToggle()));
      };
