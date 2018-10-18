import { IAction } from '../IAction';
import { actionTypes } from '../../constants/actionTypes';

export const addItem: ((id: ItemId, text: string) => IAction) =
  (id, text) => ({
    type: actionTypes.ADD_ITEM,
    payload: {
      text,
      id: id,
      isNotSynchronized: true,
    },
  });
