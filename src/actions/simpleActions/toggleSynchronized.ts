import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../IAction';
import { ItemId } from '../../models/ItemId';

export const toggleSynchronized = (id: ItemId, synchronized: boolean): IAction => ({
  type: actionTypes.TOGGLE_SYNCHRONIZED,
  payload: {
    id,
    synchronized,
  },
});
