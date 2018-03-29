import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../../@types/IAction';
import { key } from '../../@types/key';

export const addItemFactory = (generateItemKey: () => key) => (newValue: string): IAction => ({
  type: actionTypes.ITEM_ADD,
  payload: {
    itemKey: generateItemKey(),
    newValue,
  },
});
