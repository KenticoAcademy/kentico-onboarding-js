import { Map } from 'immutable';
import { IAction } from '../actions/IAction';
import { RECEIVE_ERROR } from '../actions/actionTypes';
import { ErrorMessage } from '../models/ErrorMessage';

const itemsErrorReducer = (state = Map<string, ErrorMessage>(),
                          action: IAction,) => {
  switch (action.type) {
    case RECEIVE_ERROR:
      return state.set(action.payload.id, new ErrorMessage(action.payload.error));

    default:
      return state;
  }
};

export { itemsErrorReducer };
