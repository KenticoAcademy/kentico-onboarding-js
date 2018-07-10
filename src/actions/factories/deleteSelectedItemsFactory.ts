import { Dispatch } from 'react-redux';

import { IState } from '../../store/IState';
import { IAction } from '../types/IAction';
import { deleteItemFactory } from './deleteItemFactory';
import { groupActionsToggle } from '../creators/listActions';

export const deleteSelectedItemsFactory =
  (deleteItem: (key: Key) => Promise<Response>) =>
    (selectedKeys: Array<Key>): ThunkAction =>
      (dispatch: Dispatch<IState>, getState: () => IState): Promise<IAction> => {
        dispatch(groupActionsToggle());

        return Promise
          .all(selectedKeys.map(x =>
            deleteItemFactory(deleteItem)(x)(dispatch, getState, {})
          ))
          .then(() => dispatch(groupActionsToggle()));
      };
