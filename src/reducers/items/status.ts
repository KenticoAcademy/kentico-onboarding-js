import {IAction} from '../../actions/IAction';
import {actionTypes} from '../../constants/actionTypes';
import {Reducer} from 'redux';
import {DEFAULT_VALUE, StatusType} from '../../models/Status';


export const status: Reducer<StatusType> = (state: StatusType, action: IAction) => {
  switch (action.type) {
    case actionTypes.REQUEST_ITEMS:
      return state.with({
        isFetching: true,
        errorMessage: '',
      });

    case actionTypes.RECEIVE_ITEMS:
      return state.with({
        isFetching: false,
        errorMessage: '',
      });

    case actionTypes.REQUEST_FAILED:
      return state.with({
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      });
    default:
      return new StatusType(DEFAULT_VALUE);
  }
};
