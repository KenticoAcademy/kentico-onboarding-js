import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../IAction';
import { ItemId } from '../../models/ItemId';

export const setAsSynchronized = (id: ItemId): IAction => ({
  type: actionTypes.TOGGLE_SYNCHRONIZED,
  payload: {
    id,
  },
});
