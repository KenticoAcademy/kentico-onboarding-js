import * as ActionType from './ActionTypes';
import { IAction } from './IAction';

type IdConstructor = () => Uuid;
type TimeConstructor = () => Time;

export const addItemCreator = (getIdentifier: IdConstructor, getTime: TimeConstructor): (text: string) => IAction =>
  (text: string): IAction => ({
    type: ActionType.AddItem,
    payload: {
      id: getIdentifier(),
      text,
      creationTime: getTime()
    }
  });
