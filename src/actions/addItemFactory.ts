import { ADD_ITEM } from '../constants/actionTypes';
import { IAction } from './IAction';

export const addItemFactory = (idGenerator: () => string) =>
  (text: string): IAction => ({
    type: ADD_ITEM,
    payload: {
      id: idGenerator(),
      text,
    },
  });
