import * as ActionType from './ActionTypes';
import { IAction } from './IAction';

type IdConstructor = () => Uuid;

export const addItemCreator = (getIdentifier: IdConstructor ) =>
  (text: string): IAction => ({
    type: ActionType.AddItem,
    payload: {
      id: getIdentifier(),
      text
    }
  });
