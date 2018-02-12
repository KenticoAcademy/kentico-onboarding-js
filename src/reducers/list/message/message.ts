import { IMessage } from '../../../models/interfaces/IMessage';
import { IAction } from '../../../models/interfaces/IAction';
import { Message } from '../../../models/classes/Message';
import {
  CLEAR_MESSAGE,
  ERROR_MESSAGE,
  FETCH_ITEMS_FAIL,
  SUCCESS_MESSAGE,
} from '../../../constants/actionTypes';

const defaultState: IMessage = new Message();

export const message = (state = defaultState, action: IAction): IMessage => {
  switch (action.type) {
    case ERROR_MESSAGE:
    case SUCCESS_MESSAGE:
    case CLEAR_MESSAGE:
    case FETCH_ITEMS_FAIL:
      return action.payload.message;

    default:
      return state;
  }
};
