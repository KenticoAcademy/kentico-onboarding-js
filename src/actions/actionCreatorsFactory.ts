import { IAction } from './IAction';
import { CREATE_ITEM } from './actionTypes';

export const createItemFactory = (generateId: () => string) => (text: string): IAction =>
  ({
    type: CREATE_ITEM,
    payload: {
      id: generateId(),
      text,
    },
  });
