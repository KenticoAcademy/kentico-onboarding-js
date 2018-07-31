import * as ActionType from './ActionTypes';
import { IAction } from '../interfaces/IAction';

type getIdentifierType = () => string;

export const addItemCreator = (getIdentifier: getIdentifierType) =>
  (text: string): IAction => ({
    type: ActionType.AddItem,
    payload: {
      id: getIdentifier(),
      text
    }
  });
