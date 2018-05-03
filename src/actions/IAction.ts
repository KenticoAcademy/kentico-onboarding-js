import { actionTypes } from '../constants/actionTypes';

export interface IAction {
  type: actionTypes;
  payload?: any;
}
