import * as ActionTypes from '../constants/actionTypes';
import { IAction } from '../interfaces/IAction';

export const addNewItemFactory = (createNewId: () => string) => (text: string): IAction => ({
  type: ActionTypes.ITEM_CREATED,
  payload: {
    itemId: createNewId(),
    text,
  },
});
