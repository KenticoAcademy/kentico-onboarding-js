import { actionTypes } from '../constants/actionTypes';
import { AnyAction } from 'redux';

export interface IAction extends AnyAction {
  type: actionTypes;
  payload?: any;
}
