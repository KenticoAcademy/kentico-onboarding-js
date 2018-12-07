import { IAction } from './IAction';
import * as ActionType from './ActionTypes';

export const setLastUpdateTime = (lastUpdateTime: Time): IAction => ({
  type: ActionType.SetLastRenderTime,
  payload: {
    time: lastUpdateTime
  }
});
