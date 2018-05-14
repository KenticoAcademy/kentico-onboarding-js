import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../../@types/IAction';

export const addItemFactory = (generateItemKey: () => Key) => (newValue: string): IAction => ({
  type: actionTypes.ITEM_ADD,
  payload: {
    itemKey: generateItemKey(),
    newValue,
  },
});
