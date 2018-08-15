import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../IAction';
import { ItemId } from '../../models/ItemId';

export const textUpdateChange = (id: ItemId, updatedText: string): IAction => ({
  type: actionTypes.EDIT_ITEM_TEXT,
  payload: {
    id,
    updatedText
  },
});
