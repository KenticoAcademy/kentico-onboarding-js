import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../IAction';

export const toggleEditing = (id: ItemId): IAction => ({
  type: actionTypes.TOGGLE_EDITING,
  payload: {
    id,
  },
});
