import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../../@types/IAction';
import { Key } from '../../@types/Key';

export const addItemFactory = (generateItemKey: () => Key) => (newValue: string): IAction => ({
  type: actionTypes.ITEM_ADD,
  payload: {
    itemKey: generateItemKey(),
    newValue,
  },
});
