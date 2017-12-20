import * as ActionTypes from '../constants/actionTypes';
import { IAction } from '../models/IAction';
import { Guid } from '../models/Guid';

export const addNewItemFactory = (createNewId: () => Guid) => (text: string): IAction => ({
  type: ActionTypes.ITEM_CREATED,
  payload: {
    itemId: createNewId(),
    text,
  },
});
