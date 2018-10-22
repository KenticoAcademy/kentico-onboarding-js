import { ADD_ITEM } from '../constants/actionTypes';
import { IAction } from './IAction';

export const addItemFactory = (idGenerator: () => Uuid) =>
  (text: string): IAction => ({
    type: ADD_ITEM,
    payload: {
      id: idGenerator(),
      text,
    },
  });
