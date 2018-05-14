import { actionTypes } from '../../constants/actionTypes';
import { IAction } from '../../@types/IAction';

export const startItemEditing = (itemKey: Key): IAction => ({
  type: actionTypes.ITEM_EDITING_START,
  payload: {
    itemKey,
  },
});

export const stopItemEditing = (itemKey: Key): IAction => ({
  type: actionTypes.ITEM_EDITING_STOP,
  payload: {
    itemKey,
  },
});

export const changeItemValue = (itemKey: Key, updatedValue: string): IAction => ({
  type: actionTypes.ITEM_VALUE_CHANGED,
  payload: {
    itemKey,
    updatedValue,
  },
});
