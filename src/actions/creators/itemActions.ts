import { actionTypes } from '../../constants/actionTypes';
import { key } from '../../@types/key';
import { IAction } from '../../@types/IAction';

export const startItemEditing = (itemKey: key): IAction => ({
  type: actionTypes.ITEM_EDITING_START,
  payload: {
    itemKey,
  },
});

export const stopItemEditing = (itemKey: key): IAction => ({
  type: actionTypes.ITEM_EDITING_STOP,
  payload: {
    itemKey,
  },
});

export const changeItemValue = (itemKey: key, updatedValue: string): IAction => ({
  type: actionTypes.ITEM_VALUE_CHANGED,
  payload: {
    itemKey,
    updatedValue,
  },
});
