import { actionTypes } from '../../constants/actionTypes';
import { ItemId } from '../../models/ItemId';
import { IAction } from '../IAction';

export const updateItemText = (id: ItemId): IAction => ({
  type: actionTypes.UPDATE_ITEM,
  payload: {id},
});
