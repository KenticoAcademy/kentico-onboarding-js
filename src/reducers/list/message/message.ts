import { IMessage } from '../../../models/interfaces/IMessage';
import { IAction } from '../../../models/interfaces/IAction';
import { Message } from '../../../models/classes/Message';
import {
  CLEAR_MESSAGE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '../../../constants/actionTypes';

const defaultState: IMessage = new Message();

export const message = (state = defaultState, action: IAction): IMessage => {
  switch (action.type) {
    case ERROR_MESSAGE:
    case SUCCESS_MESSAGE:
    case CLEAR_MESSAGE:
      return action.payload.message;

    default:
      return state;
  }
};
