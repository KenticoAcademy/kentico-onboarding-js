import { IAction } from './IAction';
import { actionTypes } from '../constants/actionTypes';

export const addItemFactory: (idFunc: () => string) => ((text: string) => IAction) =
  idFunc =>
    text => ({
      type: actionTypes.ADD_ITEM,
      payload: {
        text,
        id: idFunc(),
      },
    });

