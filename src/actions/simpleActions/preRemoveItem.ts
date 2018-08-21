import { IAction } from '../IAction';
import { actionTypes } from '../../constants/actionTypes';
import { ItemId } from '../../models/ItemId';


export const preRemoveItem = (id: ItemId): IAction => ({
  type: actionTypes.PRE_REMOVE_ITEM,
  payload: {
    id,
  }
});
