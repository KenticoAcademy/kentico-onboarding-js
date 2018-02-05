import { IAction } from './IAction';
import { actionTypes } from '../constants/actionTypes';

export const addItemFactory: (idGenerator: () => string) => ((text: string) => IAction) =
  idGenerator =>
    text => ({
      type: actionTypes.ADD_ITEM,
      payload: {
        text,
        id: idGenerator(),
      },
    });

