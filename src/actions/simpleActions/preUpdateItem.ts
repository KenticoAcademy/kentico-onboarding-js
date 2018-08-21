import { IAction } from '../IAction';
import { actionTypes } from '../../constants/actionTypes';
import { ItemId } from '../../models/ItemId';


export const preUpdateItem = (id: ItemId): IAction => ({
  type: actionTypes.PRE_UPDATE_ITEM,
  payload: {
    id,
  }
});
