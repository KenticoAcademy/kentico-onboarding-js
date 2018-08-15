import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../IAction';
import { ItemId } from '../../models/ItemId';

export const toggleEditing = (id: ItemId, isBeingEdited: boolean): IAction => ({
  type: actionTypes.TOGGLE_EDITING,
  payload: {
    id,
    isBeingEdited,
  },
});
