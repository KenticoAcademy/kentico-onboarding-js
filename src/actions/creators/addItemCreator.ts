import { AddItemAction } from '../types/itemsActionTypes';

export const addItemCreator = (idGenerator: () => Guid) =>
  (text: string): AddItemAction => ({
    type: 'ADD_ITEM',
    payload: {
      text,
      id: idGenerator(),
    },
  });
