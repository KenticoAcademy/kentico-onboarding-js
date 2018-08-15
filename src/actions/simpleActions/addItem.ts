import { IAction } from '../IAction';
import { actionTypes } from '../../constants/actionTypes';
import { ItemId } from '../../models/ItemId';

export const addItem: ((id: ItemId, text: string) => IAction) =
  (id, text) => ({
      type: actionTypes.ADD_ITEM,
      payload: {
        text,
        id: id,
        synchronized: false,
      },
});
