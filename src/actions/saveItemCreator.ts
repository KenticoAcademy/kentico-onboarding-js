import * as ActionType from './ActionTypes';
import { IAction } from './IAction';

type TimeConstructor = () => Time;

export const saveItemCreator = (getTime: TimeConstructor): (id: Uuid, text: string) => IAction =>
  (id: Uuid, text: string): IAction => ({
    type: ActionType.SaveItem,
    payload: {
      id,
      text,
      updateTime: getTime()
    }
  });
