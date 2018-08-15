import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../IAction';

export const updateNewItemText = (newItemText: string): IAction => ({
  type: actionTypes.UPDATE_NEW_ITEM,
  payload: {newItemText},
});
