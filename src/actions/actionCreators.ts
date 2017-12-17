import { actionTypes } from '../constants/actionTypes';
import { IAction } from './IAction';

export const addItem = (id: string, text: string): IAction => {
  return {
    type: actionTypes.ADD_ITEM,
    payload: {
      text,
      id,
    },
  };
};

export const deleteItem = (id: string): IAction => {
  return {
    type: actionTypes.DELETE_ITEM,
    payload: { id },
  };
};

export const toggleEditing = (id: string): IAction => {
  return {
    type: actionTypes.TOGGLE_EDITING,
    payload: { id },
  };
};

export const updateItemText = (id: string): IAction => {
  return {
    type: actionTypes.UPDATE_ITEM_TEXT,
    payload: { id },
  };
};

export const updateNewItemText = (newItemText: string): IAction => {
  return {
    type: actionTypes.UPDATE_NEW_ITEM_TEXT,
    payload: { newItemText },
  };
};

export const textUpdateChange = (id: string, updatedText: string): IAction => {
  return {
    type: actionTypes.TEXT_UPDATE_CHANGE,
    payload: {
      id,
      updatedText },
  };
};
