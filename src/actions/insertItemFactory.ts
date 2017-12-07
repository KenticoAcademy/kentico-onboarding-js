import { TODO_LIST_ITEM_INSERT } from '../constants/actionTypes';
import { IAction } from './IAction';
import { Uuid } from '../utils/generateId';

export const insertItemFactory = (generateId: () => Uuid) =>
  (text: string): IAction => ({
    type: TODO_LIST_ITEM_INSERT,
    payload: {
      id: generateId(),
      text,
    },
  });
