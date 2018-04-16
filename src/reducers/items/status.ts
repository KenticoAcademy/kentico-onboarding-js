import { IAction } from '../../actions/IAction';
import { actionTypes } from '../../constants/actionTypes';
import { Reducer } from 'redux';

export type statusType = {
  isFetching: boolean,
  didInvalidate: boolean,
  lastUpdated: any,
  errorMessage: string,
}

const DEFAULT_VALUE: statusType = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: undefined,
  errorMessage: "",
};

export const status: Reducer<statusType> = (state = DEFAULT_VALUE, action: IAction) => {
  switch (action.type) {
    case actionTypes.REQUEST_ITEMS:
      return {
        isFetching: true,
        didInvalidate: false,
        lastUpdated: state.lastUpdated,
        errorMessage: "",
      };

    case actionTypes.RECEIVE_ITEMS:
      return {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.payload.receivedAt,
        errorMessage:"",
      };

    case actionTypes.REQUEST_FAILED:
      return {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: state.lastUpdated,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
};