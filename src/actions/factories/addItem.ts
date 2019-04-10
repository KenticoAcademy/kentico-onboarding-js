import { ITEM_ADDED } from '../types/listActionTypes';
import { IListAction } from '../types/IListAction';

export const addItem = (generator: () => Uuid) =>
  (text: string): IListAction => ({
    type: ITEM_ADDED,
    payload: {
      id: generator(),
      text,
    },
  });