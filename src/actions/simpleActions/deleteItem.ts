import {actionTypes} from '../../constants/actionTypes';
import {IAction} from '../IAction';


export const deleteItem = (id: ItemId): IAction => ({
  type: actionTypes.DELETE_ITEM,
  payload: {id},
});
