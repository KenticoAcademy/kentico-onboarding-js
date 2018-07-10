import { Dispatch } from 'react-redux';

import { IState } from '../../store/IState';
import { IAction } from '../types/IAction';
import { saveItemFactory } from './saveItemFactory';
import { groupActionsToggle } from '../creators/listActions';

export const saveSelectedItemsFactory =
  (putItem: (key: Key, itemValue: string) => Promise<Response>) =>
    (selectedKeys: Array<Key>): ThunkAction =>
      (dispatch: Dispatch<IState>, getState: () => IState): Promise<IAction> => {
        dispatch(groupActionsToggle());


        return Promise
          .all(selectedKeys.map(x =>
            saveItemFactory(putItem)(x, getState().list.items.get(x).temporaryValue)(dispatch, getState, {})
          ))
          .then(() => dispatch(groupActionsToggle()));
      };
