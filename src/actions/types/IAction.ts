import { actionTypes } from '../../constants/actionTypes';

export interface IAction {
  readonly type: actionTypes;
  readonly payload: any;
}
