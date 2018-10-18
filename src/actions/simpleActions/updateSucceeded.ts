import {IAction} from '../IAction';
import {actionTypes} from '../../constants/actionTypes';


export const updateSucceeded = (id: ItemId): IAction => ({
  type: actionTypes.UPDATE_SUCCEEDED,
  payload: {
    id,
  },
});
